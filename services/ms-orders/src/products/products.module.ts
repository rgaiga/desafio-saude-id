/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
