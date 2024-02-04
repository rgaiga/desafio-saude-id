import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CreateProductDTO, UpdateProductDTO } from '@products/dtos';
import { Product } from '@products/interfaces/product.interface';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('PRODUCTS_SERVICE')
        private readonly productsClient: ClientProxy,
    ) {}

    async getAllProducts(): Promise<Product[]> {
        const response = await lastValueFrom(
            this.productsClient.send({ cmd: 'get_products' }, {}),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async getProductById(productId: string): Promise<Product> {
        const response = await lastValueFrom(
            this.productsClient.send({ cmd: 'get_products' }, { productId }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async createProduct(body: CreateProductDTO): Promise<Product> {
        const response = await lastValueFrom(
            this.productsClient.send({ cmd: 'create_product' }, { body }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async updateProduct(
        productId: string,
        body: UpdateProductDTO,
    ): Promise<Product> {
        const response = await lastValueFrom(
            this.productsClient.send(
                { cmd: 'update_product' },
                { productId, body },
            ),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async deleteProduct(productId: string): Promise<Product> {
        const response = await lastValueFrom(
            this.productsClient.send({ cmd: 'delete_product' }, { productId }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }
}
