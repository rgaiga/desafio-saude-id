/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository],
    exports: [ProductsService],
})
export class ProductsModule {}
