import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { ProductsController } from '@products/products.controller';
import { ProductsService } from '@products/products.service';

import { productStub } from '../stubs/product.stub';

describe('Products Controller', () => {
    let productsService: ProductsService;
    let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                ProductsService,
                {
                    provide: 'PRODUCTS_SERVICE',
                    useValue: null,
                },
            ],
        }).compile();

        productsService = module.get<ProductsService>(ProductsService);
        app = module.createNestApplication();
        await app.init();
    });

    describe('getAllProducts()', () => {
        it('should return all products and status code 200', async () => {
            const expectedResult = [productStub];

            jest.spyOn(productsService, 'getAllProducts').mockResolvedValue(
                expectedResult,
            );

            const { status, body } = await request(app.getHttpServer()).get(
                '/products',
            );

            expect(status).toBe(200);
            expect(body).toEqual(expectedResult);
        });
    });

    describe('getProductById()', () => {
        it('should return the product with matching "productId" and status code 200', async () => {
            const productId = productStub.id;

            const expectedResult = productStub;

            jest.spyOn(productsService, 'getProductById').mockResolvedValue(
                expectedResult,
            );

            const { status, body } = await request(app.getHttpServer()).get(
                `/products/${productId}`,
            );

            expect(status).toBe(200);
            expect(body).toEqual(expectedResult);
        });
    });

    describe('createProduct()', () => {
        it('should return the created product and status code 201', async () => {
            const product = { ...productStub };
            delete product.id;
            delete product.created_at;
            delete product.updated_at;

            const expectedResult = productStub;

            jest.spyOn(productsService, 'createProduct').mockResolvedValue(
                expectedResult,
            );

            const { status, body } = await request(app.getHttpServer()).post(
                '/products',
            );

            expect(status).toBe(201);
            expect(body).toEqual(expectedResult);
        });
    });

    describe('updateProduct()', () => {
        it('should return the updated product and status code 200', async () => {
            const productId = productStub.id;

            const product = { ...productStub };
            delete product.id;
            delete product.created_at;
            delete product.updated_at;

            const expectedResult = productStub;

            jest.spyOn(productsService, 'updateProduct').mockResolvedValue(
                expectedResult,
            );

            const { status, body } = await request(app.getHttpServer()).put(
                `/products/${productId}`,
            );

            expect(status).toBe(200);
            expect(body).toEqual(expectedResult);
        });
    });

    describe('deleteProduct()', () => {
        it('should return the deleted product and status code 200', async () => {
            const productId = productStub.id;

            const expectedResult = productStub;

            jest.spyOn(productsService, 'deleteProduct').mockResolvedValue(
                expectedResult,
            );

            const { status, body } = await request(app.getHttpServer()).delete(
                `/products/${productId}`,
            );

            expect(status).toBe(200);
            expect(body).toEqual(expectedResult);
        });
    });
});
