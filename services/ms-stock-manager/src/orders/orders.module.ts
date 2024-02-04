/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { OrdersRepository } from '@orders/repositories/orders.repository';
import { OrdersController } from '@orders/orders.controller';
import { OrdersService } from '@orders/orders.service';
import { ProductsModule } from '@products/products.module';

@Module({
    imports: [ProductsModule],
    controllers: [OrdersController],
    providers: [
        OrdersService,
        OrdersRepository,
        {
            provide: 'PRODUCTS_SERVICE',
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [process.env.RABBITMQ_URL],
                        queue: process.env.RABBITMQ_PRODUCTS_QUEUE,
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
        },
        {
            provide: 'ORDERS_SERVICE',
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [process.env.RABBITMQ_URL],
                        queue: process.env.RABBITMQ_ORDERS_QUEUE,
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
        },
    ],
})
export class OrdersModule {}
