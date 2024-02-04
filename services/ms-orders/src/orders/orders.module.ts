/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@users/entities/user.entity';
import { ProductEntity } from '@products/entities/product.entity';
import { OrderEntity } from '@orders/entities/order.entity';
import { OrderProductEntity } from '@orders/entities/order-product.entity';

import { OrdersRepository } from '@orders/repositories/orders.repository';
import { OrdersController } from '@orders/orders.controller';
import { OrdersService } from '@orders/orders.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            ProductEntity,
            OrderEntity,
            OrderProductEntity,
        ]),
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService,
        OrdersRepository,
        {
            provide: 'STOCK_SERVICE',
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [process.env.RABBITMQ_URL],
                        queue: process.env.RABBITMQ_STOCK_QUEUE,
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
