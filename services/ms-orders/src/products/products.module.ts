/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from '@products/entities/product.entity';
import { ProductsRepository } from '@products/repositories/products.repository';
import { ProductsController } from '@products/products.controller';
import { ProductsService } from '@products/products.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
