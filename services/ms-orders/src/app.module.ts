/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@users/entities/user.entity';
import { ProductEntity } from '@products/entities/product.entity';
import { OrderEntity } from '@orders/entities/order.entity';
import { OrderProductEntity } from '@orders/entities/order-product.entity';

import { UsersModule } from '@users/users.module';
import { ProductsModule } from '@products/products.module';
import { OrdersModule } from '@orders/orders.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            entities: [
                UserEntity,
                ProductEntity,
                OrderEntity,
                OrderProductEntity,
            ],
            synchronize: true, // TODO: Não deve ser usado em produção.
        }),
        UsersModule,
        ProductsModule,
        OrdersModule,
    ],
})
export class AppModule {}
