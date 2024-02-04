/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '@users/users.module';
import { ProductsModule } from '@products/products.module';
import { OrdersModule } from '@orders/orders.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        ProductsModule,
        OrdersModule,
    ],
})
export class AppModule {}
