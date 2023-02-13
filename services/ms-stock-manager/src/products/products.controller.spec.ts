import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductMessageDTO } from './dtos/messages/create-product-message.dto';
import { UpdateProductMessageDTO } from './dtos/messages/update-product-message.dto';
import { DeleteProductMessageDTO } from './dtos/messages/delete-product-message.dto';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productsServiceMock } from '../__tests__/mocks/products-service.mock';
import { productStub } from '../__tests__/stubs/product.stub';

describe('ProductsController', () => {
    let productsController: ProductsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                { provide: ProductsService, useValue: productsServiceMock },
                { provide: ProductsRepository, useValue: null },
            ],
        }).compile();

        productsController = module.get<ProductsController>(ProductsController);
    });

    describe('createProduct', () => {
        it('should return the created product', async () => {
            const productId = productStub.id;

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: CreateProductMessageDTO = { productId, body };

            await expect(productsController.createProduct(data)).resolves.toEqual(productStub);
        });
    });

    describe('updateProduct', () => {
        it('should return the updated product', async () => {
            const productId = productStub.id;

            const body = { ...productStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: UpdateProductMessageDTO = { productId, body };

            await expect(productsController.updateProduct(data)).resolves.toEqual(productStub);
        });
    });

    describe('deleteProduct', () => {
        it('should return the deleted product', async () => {
            const productId = productStub.id;

            const data: DeleteProductMessageDTO = { productId };

            await expect(productsController.deleteProduct(data)).resolves.toEqual(productStub);
        });
    });
});
