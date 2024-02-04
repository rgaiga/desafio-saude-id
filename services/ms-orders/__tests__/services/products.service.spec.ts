import { Test, TestingModule } from '@nestjs/testing';

import { ProductsRepository } from '@products/repositories/products.repository';
import { ProductsService } from '@products/products.service';

import { productsRepositoryMock } from '../mocks/repositories/products-repository.mock';
import { productStub } from '../stubs/product.stub';

describe('Products Service', () => {
    let productsService: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: ProductsRepository,
                    useValue: productsRepositoryMock,
                },
            ],
        }).compile();

        productsService = module.get<ProductsService>(ProductsService);
    });

    describe('createProduct()', () => {
        it('should return the created product', async () => {
            const productId = productStub.id;

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(
                productsService.createProduct(productId, body),
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

            await expect(
                productsService.updateProduct(productId, body),
            ).resolves.toEqual(productStub);
        });
    });

    describe('deleteProduct()', () => {
        it('should return the deleted product', async () => {
            const productId = productStub.id;

            await expect(
                productsService.deleteProduct(productId),
            ).resolves.toEqual(productStub);
        });
    });
});
