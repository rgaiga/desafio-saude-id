import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductNotFoundException } from '@products/http-exceptions/product-not-found.http-exception';
import { CreateProductDTO, UpdateProductDTO } from '@products/dtos';
import { ProductEntity } from '@products/entities/product.entity';
import { Product } from '@products/interfaces/product.interface';

const fields = [
    'product.id',
    'product.name',
    'product.created_at',
    'product.updated_at',
];

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productEntityRepository: Repository<ProductEntity>,
    ) {}

    async createProduct(
        productId: string,
        body: CreateProductDTO,
    ): Promise<Product> {
        const createdProduct = await this.productEntityRepository.save({
            id: productId,
            ...body,
        });

        return this.productEntityRepository
            .createQueryBuilder('product')
            .select(fields)
            .where('product.id = :productId', { productId: createdProduct.id })
            .getOne();
    }

    async updateProduct(
        productId: string,
        body: UpdateProductDTO,
    ): Promise<Product> {
        const product = await this.productEntityRepository.findOneBy({
            id: productId,
        });

        if (!product) throw new ProductNotFoundException(productId);

        await this.productEntityRepository.save({ ...product, ...body });

        return this.productEntityRepository
            .createQueryBuilder('product')
            .select(fields)
            .where('product.id = :productId', { productId })
            .getOne();
    }

    async deleteProduct(productId: string): Promise<Product> {
        const product = await this.productEntityRepository.findOneBy({
            id: productId,
        });

        if (!product) throw new ProductNotFoundException(productId);

        await this.productEntityRepository.softRemove(product);

        return this.productEntityRepository
            .createQueryBuilder('product')
            .withDeleted()
            .select(fields)
            .where('product.id = :productId', { productId })
            .getOne();
    }
}
