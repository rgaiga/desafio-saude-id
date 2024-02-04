/* istanbul ignore file */
import { Module } from '@nestjs/common';

import { ProductsRepository } from '@products/repositories/products.repository';
import { ProductsController } from '@products/products.controller';
import { ProductsService } from '@products/products.service';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository],
    exports: [ProductsService],
})
export class ProductsModule {}
