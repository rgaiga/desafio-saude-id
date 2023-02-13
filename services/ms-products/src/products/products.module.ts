/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductsController],
    providers: [
        ProductsService,
        ProductsRepository,
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
export class ProductsModule {}
