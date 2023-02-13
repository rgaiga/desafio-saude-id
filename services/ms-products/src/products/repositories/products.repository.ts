import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductNotFoundException } from '../../http-exceptions/product-not-found.http-exception';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { Product } from '../interfaces/product.interface';

const fields = [
    'product.id',
    'product.name',
    'product.description',
    'product.sku',
    'product.unit_price',
    'product.quantity_available',
    'product.created_at',
    'product.updated_at',
];

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productEntityRepository: Repository<ProductEntity>,
    ) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productEntityRepository.createQueryBuilder('product').select(fields).getMany();
    }

    async getProductById(productId: string): Promise<Product> {
        const product = await this.productEntityRepository
            .createQueryBuilder('product')
            .select(fields)
            .where('product.id = :productId', { productId })
            .getOne();

        if (!product) throw new ProductNotFoundException(productId);

        return product;
    }

    async createProduct(body: CreateProductDTO): Promise<Product> {
        const product = await this.productEntityRepository.save(body);

        return this.productEntityRepository
            .createQueryBuilder('product')
            .select(fields)
            .where('product.id = :productId', { productId: product.id })
            .getOne();
    }

    async updateProduct(productId: string, body: UpdateProductDTO): Promise<Product> {
        const product = await this.productEntityRepository.findOneBy({ id: productId });

        if (!product) throw new ProductNotFoundException(productId);

        await this.productEntityRepository.save({ ...product, ...body });

        return this.productEntityRepository
            .createQueryBuilder('product')
            .select(fields)
            .where('product.id = :productId', { productId: product.id })
            .getOne();
    }

    async deleteProduct(productId: string): Promise<Product> {
        const product = await this.productEntityRepository.findOneBy({ id: productId });

        if (!product) throw new ProductNotFoundException(productId);

        await this.productEntityRepository.softRemove(product);

        return this.productEntityRepository
            .createQueryBuilder('product')
            .withDeleted()
            .select(fields)
            .where('product.id = :productId', { productId: product.id })
            .getOne();
    }
}
