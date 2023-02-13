import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductsRepository } from './products.repository';
import { productEntityRepositoryMock } from '../../__tests__/mocks/product-entity-repository.mock';
import { productStub } from '../../__tests__/stubs/product.stub';

describe('ProductsRepository', () => {
    let productsRepository: ProductsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsRepository,
                {
                    provide: getRepositoryToken(ProductEntity),
                    useValue: productEntityRepositoryMock,
                },
            ],
        }).compile();

        productsRepository = module.get<ProductsRepository>(ProductsRepository);
    });

    describe('getAllProducts', () => {
        it('should return all products', async () => {
            await expect(productsRepository.getAllProducts()).resolves.toEqual([productStub]);
        });
    });

    describe('getProductById', () => {
        it('should return the product with matching "productId"', async () => {
            const productId = productStub.id;

            await expect(productsRepository.getProductById(productId)).resolves.toEqual(
                productStub,
            );
        });

        it('should throw an error if product with matching "productId" is not found', async () => {
            const productId = 'INVALID_ID';

            productEntityRepositoryMock.createQueryBuilder.mockImplementationOnce(() => ({
                select: jest.fn().mockImplementation(() => ({
                    where: jest.fn().mockImplementation(() => ({
                        getOne: jest.fn().mockResolvedValue(null),
                    })),
                })),
            }));

            await expect(productsRepository.getProductById(productId)).rejects.toThrow();
        });
    });

    describe('createProduct', () => {
        it('should return the created product', async () => {
            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(productsRepository.createProduct(body)).resolves.toEqual(productStub);
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

        it('should throw an error if product with matching "productId" is not found', async () => {
            const productId = 'INVALID_ID';

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            productEntityRepositoryMock.findOneBy.mockResolvedValueOnce(null);

            await expect(productsRepository.updateProduct(productId, body)).rejects.toThrow();
        });
    });

    describe('deleteProduct', () => {
        it('should return the deleted product', async () => {
            const productId = productStub.id;

            await expect(productsRepository.deleteProduct(productId)).resolves.toEqual(productStub);
        });

        it('should throw an error if product with matching "productId" is not found', async () => {
            const productId = 'INVALID_ID';

            productEntityRepositoryMock.findOneBy.mockResolvedValueOnce(null);

            await expect(productsRepository.deleteProduct(productId)).rejects.toThrow();
        });
    });
});
