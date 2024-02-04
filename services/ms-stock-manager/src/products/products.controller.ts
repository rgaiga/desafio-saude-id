import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

import {
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

    @EventPattern('product.created')
    async createProduct(
        @Payload() data: CreateProductMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Product> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.productsService.createProduct(data.productId, data.body);
    }

    @EventPattern('product.updated')
    async updateProduct(
        @Payload() data: UpdateProductMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Product> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.productsService.updateProduct(data.productId, data.body);
    }

    @EventPattern('product.deleted')
    async deleteProduct(
        @Payload() data: DeleteProductMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Product> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.productsService.deleteProduct(data.productId);
    }
}
