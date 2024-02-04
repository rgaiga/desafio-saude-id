import { Injectable } from '@nestjs/common';

import { CreateProductDTO, UpdateProductDTO } from '@products/dtos';
import { Product } from '@products/interfaces/product.interface';
import { ProductsRepository } from '@products/repositories/products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async getProductById(productId: string): Promise<Product> {
        return this.productsRepository.getProductById(productId);
    }

    async createProduct(
        productId: string,
        body: CreateProductDTO,
    ): Promise<Product> {
        return this.productsRepository.createProduct(productId, body);
    }

    async updateProduct(
        productId: string,
        body: UpdateProductDTO,
    ): Promise<Product> {
        return this.productsRepository.updateProduct(productId, body);
    }

    async deleteProduct(productId: string): Promise<Product> {
        return this.productsRepository.deleteProduct(productId);
    }
}
