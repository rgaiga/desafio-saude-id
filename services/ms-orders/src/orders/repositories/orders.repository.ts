import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserNotFoundException } from '@users/http-exceptions/user-not-found.http-exception';
import { ProductNotFoundException } from '@products/http-exceptions/product-not-found.http-exception';
import { OrderNotFoundException } from '@orders/http-exceptions/order-not-found.http-exception';
import { CreateOrderDTO, UpdateOrderDTO } from '@orders/dtos';
import { UserEntity } from '@users/entities/user.entity';
import { ProductEntity } from '@products/entities/product.entity';
import { OrderEntity } from '@orders/entities/order.entity';
import { OrderProductEntity } from '@orders/entities/order-product.entity';
import { Order } from '@orders/interfaces/order.interface';

const fields = [
    'order.id',
    'order.user_id',
    'order.status',
    'order.total_quantity',
    'order.total_price',
    'order.observation',
    'order.created_at',
    'order.updated_at',
    'products.product_id',
    'products.quantity',
    'products.unit_price',
];

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        @InjectRepository(ProductEntity)
        private readonly producEntityRepository: Repository<ProductEntity>,
        @InjectRepository(OrderEntity)
        private readonly orderEntityRepository: Repository<OrderEntity>,
        @InjectRepository(OrderProductEntity)
        private readonly orderProductEntityRepository: Repository<OrderProductEntity>,
    ) {}

    async getAllOrders(): Promise<Order[]> {
        return this.orderEntityRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.products', 'products')
            .select(fields)
            .getMany();
    }

    async getOrderById(orderId: string): Promise<Order> {
        const order = await this.orderEntityRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.products', 'products')
            .select(fields)
            .where('order.id = :orderId', { orderId })
            .getOne();

        if (!order) throw new OrderNotFoundException(orderId);

        return order;
    }

    async createOrder(body: CreateOrderDTO): Promise<Order | any> {
        const user = await this.userEntityRepository.findOneBy({
            id: body.user_id,
        });

        if (!user) throw new UserNotFoundException(body.user_id);

        let totalQuantity = 0;
        let totalPrice = 0;

        for (let i = 0; i < body.products.length; i++) {
            const { product_id } = body.products[i];

            const product = await this.producEntityRepository.findOneBy({
                id: product_id,
            });

            if (!product) throw new ProductNotFoundException(product_id);

            body.products[i].unit_price = 100; // TODO: Trocar.

            totalQuantity += body.products[i].quantity;
            totalPrice +=
                body.products[i].unit_price * body.products[i].quantity;
        }

        body.total_quantity = totalQuantity;
        body.total_price = totalPrice;
        body.status = 'CREATED';
        body.observation = 'Ordem criada, aguardando processamento...';

        const createdOrder = await this.orderEntityRepository.save(body);

        for (const { product_id, quantity, unit_price } of body.products)
            await this.orderProductEntityRepository.save({
                order_id: createdOrder.id,
                product_id,
                quantity,
                unit_price,
            });

        return this.orderEntityRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.products', 'products')
            .select(fields)
            .where('order.id = :orderId', { orderId: createdOrder.id })
            .getOne();
    }

    async updateOrder(orderId: string, body: UpdateOrderDTO): Promise<Order> {
        const order = await this.orderEntityRepository.findOneBy({
            id: orderId,
        });

        if (!order) throw new OrderNotFoundException(orderId);

        await this.orderEntityRepository.save({ ...order, ...body });

        return this.orderEntityRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.products', 'products')
            .select(fields)
            .where('order.id = :orderId', { orderId: order.id })
            .getOne();
    }

    async deleteOrder(orderId: string): Promise<Order> {
        const order = await this.orderEntityRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.products', 'products')
            .select(['order', 'products'])
            .where('order.id = :orderId', { orderId })
            .getOne();

        if (!order) throw new OrderNotFoundException(orderId);

        for (const product of order.products) {
            await this.orderProductEntityRepository.softRemove(product);
        }

        await this.orderEntityRepository.softRemove(order);

        return this.orderEntityRepository
            .createQueryBuilder('order')
            .withDeleted()
            .leftJoinAndSelect('order.products', 'products')
            .select(fields)
            .where('order.id = :orderId', { orderId: order.id })
            .getOne();
    }
}
