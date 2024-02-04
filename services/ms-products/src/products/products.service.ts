import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateProductDTO, UpdateProductDTO } from '@products/dtos';
import { Product } from '@products/interfaces/product.interface';
import { ProductsRepository } from '@products/repositories/products.repository';

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
        const createdProduct = await this.productsRepository.createProduct(
            body,
        );

        this.ordersClient.emit('product.created', {
            productId: createdProduct.id,
            body: { ...createdProduct },
        });

        this.stockClient.emit('product.created', {
            productId: createdProduct.id,
            body: { ...createdProduct },
        });

        return createdProduct;
    }

    async updateProduct(
        productId: string,
        body: UpdateProductDTO,
    ): Promise<Product> {
        const updatedProduct = await this.productsRepository.updateProduct(
            productId,
            body,
        );

        this.ordersClient.emit('product.updated', {
            productId,
            body: { ...updatedProduct },
        });

        this.stockClient.emit('product.updated', {
            productId,
            body: { ...updatedProduct },
        });

        return updatedProduct;
    }

    async deleteProduct(productId: string): Promise<Product> {
        const deletedProduct = await this.productsRepository.deleteProduct(
            productId,
        );

        this.ordersClient.emit('product.deleted', {
            productId,
        });

        this.stockClient.emit('product.deleted', {
            productId,
        });

        return deletedProduct;
    }
}
