import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateOrderDTO, UpdateOrderDTO } from '@orders/dtos';
import { Order } from '@orders/interfaces/order.interface';
import { OrdersRepository } from '@orders/repositories/orders.repository';

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
        const createdOrder = await this.ordersRepository.createOrder(body);

        this.stockClient.emit('order.created', {
            orderId: createdOrder.id,
            body: { ...createdOrder },
        });

        return createdOrder;
    }

    async updateOrder(orderId: string, body: UpdateOrderDTO): Promise<Order> {
        const updatedOrder = await this.ordersRepository.updateOrder(
            orderId,
            body,
        );

        this.stockClient.emit('order.updated', {
            orderId,
            body: { ...updatedOrder },
        });

        return updatedOrder;
    }

    async deleteOrder(orderId: string): Promise<Order> {
        const deletedOrder = await this.ordersRepository.deleteOrder(orderId);

        this.stockClient.emit('order.deleted', {
            orderId,
        });

        return deletedOrder;
    }
}
