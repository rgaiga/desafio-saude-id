/* istanbul ignore file */
import { productStub } from '../stubs/product.stub';

export const productsRepositoryMock = {
    getProductById: jest.fn().mockResolvedValue(productStub),
    createProduct: jest.fn().mockResolvedValue(productStub),
    updateProduct: jest.fn().mockResolvedValue(productStub),
    deleteProduct: jest.fn().mockResolvedValue(productStub),
};
