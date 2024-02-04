import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';
import {
    ApiTags,
    ApiParam,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
} from '@nestjs/swagger';

import { ProductResponse } from '@products/responses/products.response';
import { CreateProductDTO, UpdateProductDTO } from '@products/dtos';
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @ApiOperation({ summary: 'Busca por todos os produtos' })
    @ApiOkResponse({ description: 'OK', type: [ProductResponse] })
    async getAllProducts(): Promise<Product[]> {
        return this.productsService.getAllProducts();
    }

    @Get(':productId')
    @ApiParam({
        name: 'productId',
        description: 'ID do produto',
        example: '00000000-0000-0000-0000-000000000000',
    })
    @ApiOperation({ summary: 'Busca pelo produto com o ID especificado' })
    @ApiOkResponse({ description: 'OK', type: ProductResponse })
    async getProductById(
        @Param('productId') productId: string,
    ): Promise<Product> {
        return this.productsService.getProductById(productId);
    }

    @Post()
    @ApiOperation({ summary: 'Cria um novo produto' })
    @ApiCreatedResponse({ description: 'Created', type: ProductResponse })
    async createProduct(@Body() body: CreateProductDTO): Promise<Product> {
        return this.productsService.createProduct(body);
    }

    @Put(':productId')
    @ApiParam({
        name: 'productId',
        description: 'ID do produto',
        example: '00000000-0000-0000-0000-000000000000',
    })
    @ApiOperation({ summary: 'Atualiza o produto com o ID especificado' })
    @ApiOkResponse({ description: 'OK', type: ProductResponse })
    async updateProduct(
        @Param('productId') productId: string,
        @Body() body: UpdateProductDTO,
    ): Promise<Product> {
        return this.productsService.updateProduct(productId, body);
    }

    @Delete(':productId')
    @ApiParam({
        name: 'productId',
        description: 'ID do produto',
        example: '00000000-0000-0000-0000-000000000000',
    })
    @ApiOperation({ summary: 'Remove o produto com o ID especificado' })
    @ApiOkResponse({ description: 'OK', type: ProductResponse })
    async deleteProduct(
        @Param('productId') productId: string,
    ): Promise<Product> {
        return this.productsService.deleteProduct(productId);
    }
}
