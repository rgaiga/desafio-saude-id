import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductNotFoundException } from '../http-exceptions/product-not-found.http-exception';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,
        @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
        @Inject('STOCK_SERVICE') private readonly stockClient: ClientProxy,
    ) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productsRepository.getAllProducts();
    }

    async getProductById(productId: string): Promise<Product> {
        return this.productsRepository.getProductById(productId);
    }

    async createProduct(body: CreateProductDTO): Promise<Product> {
        const product = await this.productsRepository.createProduct(body);

        this.ordersClient.emit('product.created', {
            productId: product.id,
            body: { ...product },
        });

        this.stockClient.emit('product.created', {
            productId: product.id,
            body: { ...product },
        });

        return product;
    }

    async updateProduct(productId: string, body: UpdateProductDTO): Promise<Product> {
        const product = await this.productsRepository.updateProduct(productId, body);

        this.ordersClient.emit('product.updated', {
            productId,
            body: { ...product },
        });

        this.stockClient.emit('product.updated', {
            productId,
            body: { ...product },
        });

        return product;
    }

    async deleteProduct(productId: string): Promise<Product> {
        const product = await this.productsRepository.deleteProduct(productId);

        this.ordersClient.emit('product.deleted', {
            productId,
        });

        this.stockClient.emit('product.deleted', {
            productId,
        });

        return product;
    }
}
