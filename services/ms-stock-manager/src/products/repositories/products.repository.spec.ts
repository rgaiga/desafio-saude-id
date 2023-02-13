import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from './products.repository';
import { productsRedisMock } from '../../__tests__/mocks/products-redis.mock';
import { productStub } from '../../__tests__/stubs/product.stub';

describe('ProductsRepository', () => {
    let productsRepository: ProductsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsRepository,
                {
                    provide: 'RedisModule:default',
                    useValue: productsRedisMock,
                },
            ],
        }).compile();

        productsRepository = module.get<ProductsRepository>(ProductsRepository);
    });

    describe('getProductById', () => {
        it('should return the product with matching "productId"', async () => {
            const userId = productStub.id;

            await expect(productsRepository.getProductById(userId)).resolves.toEqual(productStub);
        });

        it('should throw an error', async () => {
            const userId = productStub.id;

            productsRedisMock.call.mockRejectedValueOnce(null);

            await expect(productsRepository.getProductById(userId)).rejects.toThrow();
        });
    });

    describe('createProduct', () => {
        it('should return the created product', async () => {
            const userId = productStub.id;

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(productsRepository.createProduct(userId, body)).resolves.toEqual(
                productStub,
            );
        });

        it('should throw an error', async () => {
            const userId = productStub.id;

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            productsRedisMock.call.mockRejectedValueOnce(null);

            await expect(productsRepository.createProduct(userId, body)).rejects.toThrow();
        });
    });

    describe('updateProduct', () => {
        it('should return the updated product', async () => {
            const productId = productStub.id;

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(productsRepository.updateProduct(productId, body)).resolves.toEqual(
                productStub,
            );
        });

        it('should throw an error', async () => {
            const userId = productStub.id;

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            productsRedisMock.call.mockRejectedValueOnce(null);

            await expect(productsRepository.updateProduct(userId, body)).rejects.toThrow();
        });
    });

    describe('deleteProduct', () => {
        it('should return the deleted product', async () => {
            const productId = productStub.id;

            await expect(productsRepository.deleteProduct(productId)).resolves.toEqual(productStub);
        });

        it('should throw an error', async () => {
            const userId = productStub.id;

            productsRedisMock.call.mockRejectedValueOnce(null);

            await expect(productsRepository.deleteProduct(userId)).rejects.toThrow();
        });
    });
});
