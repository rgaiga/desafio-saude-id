import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

import { CreateOrderDTO, UpdateOrderDTO } from '@orders/dtos';
import { Order } from '@orders/interfaces/order.interface';

@Injectable()
export class OrdersRepository {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async getOrderById(productId: string): Promise<Order> {
        try {
            const response = (await this.redis.call(
                'JSON.GET',
                `Order:${productId}`,
            )) as string;

            return JSON.parse(response);
        } catch (error) {
            throw new error();
        }
    }

    async createOrder(orderId: string, body: CreateOrderDTO): Promise<Order> {
        try {
            await this.redis.call(
                'JSON.SET',
                `Order:${orderId}`,
                '.',
                JSON.stringify(body),
            );

            const response = (await this.redis.call(
                'JSON.GET',
                `Order:${orderId}`,
            )) as string;

            return JSON.parse(response);
        } catch (error) {
            throw new error();
        }
    }

    async updateOrder(orderId: string, body: UpdateOrderDTO): Promise<Order> {
        try {
            await this.redis.call(
                'JSON.SET',
                `Order:${orderId}`,
                '.',
                JSON.stringify(body),
            );

            const response = (await this.redis.call(
                'JSON.GET',
                `Order:${orderId}`,
            )) as string;

            return JSON.parse(response);
        } catch (error) {
            throw new error();
        }
    }

    async deleteOrder(orderId: string): Promise<Order> {
        try {
            const response = (await this.redis.call(
                'JSON.GET',
                `Order:${orderId}`,
            )) as string;

            await this.redis.call('JSON.DEL', `Order:${orderId}`);

            return JSON.parse(response);
        } catch (error) {
            throw new error();
        }
    }
}
