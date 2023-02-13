import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductsRepository {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async getProductById(productId: string): Promise<Product> {
        try {
            const response = (await this.redis.call('JSON.GET', `Product:${productId}`)) as string;

            return JSON.parse(response);
        } catch (error) {
            throw new error();
        }
    }

    async createProduct(productId: string, body: CreateProductDTO): Promise<Product> {
        try {
            await this.redis.call('JSON.SET', `Product:${productId}`, '.', JSON.stringify(body));

            const response = (await this.redis.call('JSON.GET', `Product:${productId}`)) as string;

            return JSON.parse(response);
        } catch (error) {
            throw new error();
        }
    }

    async updateProduct(productId: string, body: UpdateProductDTO): Promise<Product> {
        try {
            await this.redis.call('JSON.SET', `Product:${productId}`, '.', JSON.stringify(body));

            const response = (await this.redis.call('JSON.GET', `Product:${productId}`)) as string;

            return JSON.parse(response);
        } catch (error) {
            throw new error();
        }
    }

    async deleteProduct(productId: string): Promise<Product> {
        try {
            const response = (await this.redis.call('JSON.GET', `Product:${productId}`)) as string;

            await this.redis.call('JSON.DEL', `Product:${productId}`);

            return JSON.parse(response);
        } catch (error) {
            throw new error();
        }
    }
}
