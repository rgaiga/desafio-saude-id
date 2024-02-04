import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CreateOrderDTO, UpdateOrderDTO } from '@orders/dtos';
import { Order } from '@orders/interfaces/order.interface';

@Injectable()
export class OrdersService {
    constructor(
        @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
    ) {}

    async getAllOrders(): Promise<Order[]> {
        const response = await lastValueFrom(
            this.ordersClient.send({ cmd: 'get_orders' }, {}),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async getOrderById(orderId: string): Promise<Order> {
        const response = await lastValueFrom(
            this.ordersClient.send({ cmd: 'get_orders' }, { orderId }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async createOrder(body: CreateOrderDTO): Promise<Order> {
        const response = await lastValueFrom(
            this.ordersClient.send({ cmd: 'create_order' }, { body }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async updateOrder(orderId: string, body: UpdateOrderDTO): Promise<Order> {
        const response = await lastValueFrom(
            this.ordersClient.send({ cmd: 'update_order' }, { orderId, body }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async deleteOrder(orderId: string): Promise<Order> {
        const response = await lastValueFrom(
            this.ordersClient.send({ cmd: 'delete_order' }, { orderId }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }
}
