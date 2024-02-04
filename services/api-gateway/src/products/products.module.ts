/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { ProductsController } from '@products/products.controller';
import { ProductsService } from '@products/products.service';

@Module({
    controllers: [ProductsController],
    providers: [
        ProductsService,
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
    ],
})
export class ProductsModule {}
