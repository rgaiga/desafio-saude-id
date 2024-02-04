import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { ProductsService } from '@products/products.service';

import { clientProxyMock } from '../mocks/client-proxy.mock';
import { productStub } from '../stubs/product.stub';

describe('Products Service', () => {
    let productsService: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                { provide: 'PRODUCTS_SERVICE', useValue: clientProxyMock },
            ],
        }).compile();

        productsService = module.get<ProductsService>(ProductsService);
    });

    describe('getAllProducts()', () => {
        it('should return all products', async () => {
            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next([productStub]);
                    s.complete();
                }),
            );

            await expect(productsService.getAllProducts()).resolves.toEqual([
                productStub,
            ]);
        });

        it('should throw an error', async () => {
            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(productsService.getAllProducts()).rejects.toThrow();
        });
    });

    describe('getProductById()', () => {
        it('should return the product with matching "productId"', async () => {
            const productId = productStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(productStub);
                    s.complete();
                }),
            );

            await expect(
                productsService.getProductById(productId),
            ).resolves.toEqual(productStub);
        });

        it('should throw an error', async () => {
            const productId = productStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(
                productsService.getProductById(productId),
            ).rejects.toThrow();
        });
    });

    describe('createProduct()', () => {
        it('should return the created product', async () => {
            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(productStub);
                    s.complete();
                }),
            );

            await expect(productsService.createProduct(body)).resolves.toEqual(
                productStub,
            );
        });

        it('should throw an error', async () => {
            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(productsService.createProduct(body)).rejects.toThrow();
        });
    });

    describe('updateProduct()', () => {
        it('should return the updated product', async () => {
            const productId = productStub.id;

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(productStub);
                    s.complete();
                }),
            );

            await expect(
                productsService.updateProduct(productId, body),
            ).resolves.toEqual(productStub);
        });

        it('should throw an error', async () => {
            const productId = productStub.id;

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(
                productsService.updateProduct(productId, body),
            ).rejects.toThrow();
        });
    });

    describe('deleteProduct()', () => {
        it('should return the deleted product', async () => {
            const productId = productStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(productStub);
                    s.complete();
                }),
            );

            await expect(
                productsService.deleteProduct(productId),
            ).resolves.toEqual(productStub);
        });

        it('should throw an error', async () => {
            const productId = productStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(
                productsService.deleteProduct(productId),
            ).rejects.toThrow();
        });
    });
});
