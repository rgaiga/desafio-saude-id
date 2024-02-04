/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { ProductsModule } from '@products/products.module';
import { OrdersModule } from '@orders/orders.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        RedisModule.forRoot({
            config: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
                password: process.env.REDIS_PASSWORD,
            },
        }),
        ProductsModule,
        OrdersModule,
    ],
})
export class AppModule {}
