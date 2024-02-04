import { Controller, Logger } from '@nestjs/common';
import {
    MessagePattern,
    Payload,
    Ctx,
    RmqContext,
} from '@nestjs/microservices';

import {
    GetProductsMessageDTO,
    CreateProductMessageDTO,
    UpdateProductMessageDTO,
    DeleteProductMessageDTO,
} from '@products/dtos';
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/products.service';

@Controller('products')
export class ProductsController {
    private readonly logger = new Logger(ProductsController.name);

    constructor(private readonly productsService: ProductsService) {}

    @MessagePattern({ cmd: 'get_products' })
    async getProducts(
        @Payload() data: GetProductsMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Product | Product[]> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        if (data.productId)
            return this.productsService.getProductById(data.productId);

        return this.productsService.getAllProducts();
    }

    @MessagePattern({ cmd: 'create_product' })
    async createProduct(
        @Payload() data: CreateProductMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Product> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.productsService.createProduct(data.body);
    }

    @MessagePattern({ cmd: 'update_product' })
    async updateProduct(
        @Payload() data: UpdateProductMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Product> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.productsService.updateProduct(data.productId, data.body);
    }

    @MessagePattern({ cmd: 'delete_product' })
    async deleteProduct(
        @Payload() data: DeleteProductMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Product> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.productsService.deleteProduct(data.productId);
    }
}
