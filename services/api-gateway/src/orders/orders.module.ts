/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { OrdersController } from '@orders/orders.controller';
import { OrdersService } from '@orders/orders.service';

@Module({
    controllers: [OrdersController],
    providers: [
        OrdersService,
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
