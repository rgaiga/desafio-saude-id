import { Test, TestingModule } from '@nestjs/testing';

import { ProductsRepository } from '@products/repositories/products.repository';
import { ProductsService } from '@products/products.service';

import { productsRepositoryMock } from '../mocks/products-repository.mock';
import { clientProxyMock } from '../mocks/client-proxy.mock';
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
                { provide: 'ORDERS_SERVICE', useValue: clientProxyMock },
                { provide: 'STOCK_SERVICE', useValue: clientProxyMock },
            ],
        }).compile();

        productsService = module.get<ProductsService>(ProductsService);
    });

    describe('getAllProducts()', () => {
        it('should return all products', async () => {
            await expect(productsService.getAllProducts()).resolves.toEqual([
                productStub,
            ]);
        });
    });

    describe('getProductById()', () => {
        it('should return the product with matching "productId"', async () => {
            const productId = productStub.id;

            await expect(
                productsService.getProductById(productId),
            ).resolves.toEqual(productStub);
        });
    });

    describe('createProduct()', () => {
        it('should return the created product', async () => {
            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(productsService.createProduct(body)).resolves.toEqual(
                productStub,
            );

            expect(clientProxyMock.emit).toHaveBeenCalledWith(
                'product.created',
                {
                    productId: productStub.id,
                    body: { ...productStub },
                },
            );
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

            expect(clientProxyMock.emit).toHaveBeenCalledWith(
                'product.updated',
                {
                    productId: productStub.id,
                    body: { ...productStub },
                },
            );
        });
    });

    describe('deleteProduct()', () => {
        it('should return the deleted product', async () => {
            const productId = productStub.id;

            await expect(
                productsService.deleteProduct(productId),
            ).resolves.toEqual(productStub);

            expect(clientProxyMock.emit).toHaveBeenCalledWith(
                'product.deleted',
                {
                    productId: productStub.id,
                },
            );
        });
    });
});
