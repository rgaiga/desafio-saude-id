import { Test, TestingModule } from '@nestjs/testing';

import {
    GetProductsMessageDTO,
    CreateProductMessageDTO,
    UpdateProductMessageDTO,
    DeleteProductMessageDTO,
} from '@products/dtos';
import { ProductsRepository } from '@products/repositories/products.repository';
import { ProductsController } from '@products/products.controller';
import { ProductsService } from '@products/products.service';

import { productsServiceMock } from '../mocks/products-service.mock';
import { productStub } from '../stubs/product.stub';

describe('Products Controller', () => {
    let productsController: ProductsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                { provide: ProductsService, useValue: productsServiceMock },
                { provide: ProductsRepository, useValue: null },
                { provide: 'ORDERS_SERVICE', useValue: null },
                { provide: 'STOCK_SERVICE', useValue: null },
            ],
        }).compile();

        productsController = module.get<ProductsController>(ProductsController);
    });

    describe('getProducts()', () => {
        it('should return all products', async () => {
            const data: GetProductsMessageDTO = { productId: null };

            await expect(productsController.getProducts(data)).resolves.toEqual(
                [productStub],
            );
        });

        it('should return the product with matching "productId"', async () => {
            const productId = productStub.id;

            const data: GetProductsMessageDTO = { productId };

            await expect(productsController.getProducts(data)).resolves.toEqual(
                productStub,
            );
        });
    });

    describe('createProduct()', () => {
        it('should return the created product', async () => {
            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: CreateProductMessageDTO = { body };

            await expect(
                productsController.createProduct(data),
            ).resolves.toEqual(productStub);
        });
    });

    describe('updateProduct()', () => {
        it('should return the updated product', async () => {
            const productId = productStub.id;

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: UpdateProductMessageDTO = { productId, body };

            await expect(
                productsController.updateProduct(data),
            ).resolves.toEqual(productStub);
        });
    });

    describe('deleteProduct()', () => {
        it('should return the deleted product', async () => {
            const productId = productStub.id;

            const data: DeleteProductMessageDTO = { productId };

            await expect(
                productsController.deleteProduct(data),
            ).resolves.toEqual(productStub);
        });
    });
});
