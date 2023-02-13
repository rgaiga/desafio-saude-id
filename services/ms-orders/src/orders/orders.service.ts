import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { Order } from './interfaces/order.interface';
import { OrdersRepository } from './repositories/orders.repository';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        @Inject('STOCK_SERVICE') private readonly stockClient: ClientProxy,
    ) {}

    async getAllOrders(): Promise<Order[]> {
        return this.ordersRepository.getAllOrders();
    }

    async getOrderById(orderId: string): Promise<Order> {
        return this.ordersRepository.getOrderById(orderId);
    }

    async createOrder(body: CreateOrderDTO): Promise<Order> {
        const order = await this.ordersRepository.createOrder(body);

        this.stockClient.emit('order.created', {
            orderId: order.id,
            body: { ...order },
        });

        return order;
    }

    async updateOrder(orderId: string, body: UpdateOrderDTO): Promise<Order> {
        const order = await this.ordersRepository.updateOrder(orderId, body);

        this.stockClient.emit('order.updated', {
            orderId,
            body: { ...order },
        });

        return order;
    }

    async deleteOrder(orderId: string): Promise<Order> {
        const order = await this.ordersRepository.deleteOrder(orderId);

        this.stockClient.emit('order.deleted', {
            orderId,
        });

        return order;
    }
}
