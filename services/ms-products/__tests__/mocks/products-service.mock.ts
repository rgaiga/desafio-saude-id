/* istanbul ignore file */
import { productStub } from '../stubs/product.stub';

export const productsServiceMock = {
    getAllProducts: jest.fn().mockResolvedValue([productStub]),
    getProductById: jest.fn().mockResolvedValue(productStub),
    createProduct: jest.fn().mockResolvedValue(productStub),
    updateProduct: jest.fn().mockResolvedValue(productStub),
    deleteProduct: jest.fn().mockResolvedValue(productStub),
};
