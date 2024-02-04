import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateOrderDTO, UpdateOrderDTO } from '@orders/dtos';
import { Order } from '@orders/interfaces/order.interface';
import { OrdersRepository } from '@orders/repositories/orders.repository';
import { ProductsService } from '@products/products.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productsService: ProductsService,
        @Inject('PRODUCTS_SERVICE')
        private readonly productsClient: ClientProxy,
        @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
    ) {}

    async createOrder(orderId: string, body: CreateOrderDTO): Promise<Order> {
        await this.ordersRepository.createOrder(orderId, body);

        return this.processOrder(orderId);
    }

    async updateOrder(orderId: string, body: UpdateOrderDTO): Promise<Order> {
        return this.ordersRepository.updateOrder(orderId, body);
    }

    async deleteOrder(orderId: string): Promise<Order> {
        const order = await this.ordersRepository.getOrderById(orderId);

        // Se a ordem já foi confirmada, mas ainda não saiu para entrega,
        // então retornamos cada produto para o estoque.
        if (order.status === 'CONFIRMED') {
            for (const { product_id, quantity } of order.products) {
                const product = await this.productsService.getProductById(
                    product_id,
                );

                product.quantity_available += quantity;

                this.productsClient.emit(
                    { cmd: 'update_product' },
                    {
                        productId: product_id,
                        body: {
                            quantity_available: product.quantity_available,
                        },
                    },
                );
            }
        }

        return this.ordersRepository.deleteOrder(orderId);
    }

    async processOrder(orderId: string): Promise<Order> {
        const order = await this.ordersRepository.getOrderById(orderId);

        for (const { product_id, quantity } of order.products) {
            const product = await this.productsService.getProductById(
                product_id,
            );

            const isStockAvailable = product.quantity_available > quantity;

            // Se não há estoque suficiente de pelo menos um produto,
            // então cancelamos a ordem.
            if (!isStockAvailable) {
                order.status = 'CANCELED';
                order.observation =
                    'Não há estoque suficiente de um ou mais produtos.';

                this.ordersClient.emit(
                    { cmd: 'update_order' },
                    {
                        orderId,
                        body: {
                            ...order,
                        },
                    },
                );

                return order;
            }
        }

        // Se há estoque suficiente de todos os produtos,
        // então confirmamos a ordem.
        order.status = 'CONFIRMED';
        order.observation = 'Ordem confirmada. Aguardando envio...';

        this.ordersClient.emit(
            { cmd: 'update_order' },
            {
                orderId,
                body: {
                    ...order,
                },
            },
        );

        for (const { product_id, quantity } of order.products) {
            const product = await this.productsService.getProductById(
                product_id,
            );

            product.quantity_available -= quantity;

            this.productsClient.emit(
                { cmd: 'update_product' },
                {
                    productId: product_id,
                    body: {
                        quantity_available: product.quantity_available,
                    },
                },
            );
        }

        return order;
    }
}
