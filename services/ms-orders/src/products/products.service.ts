import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async createProduct(productId: string, body: CreateProductDTO): Promise<Product> {
        return this.productsRepository.createProduct(productId, body);
    }

    async updateProduct(productId: string, body: UpdateProductDTO): Promise<Product> {
        return this.productsRepository.updateProduct(productId, body);
    }

    async deleteProduct(productId: string): Promise<Product> {
        return this.productsRepository.deleteProduct(productId);
    }
}
