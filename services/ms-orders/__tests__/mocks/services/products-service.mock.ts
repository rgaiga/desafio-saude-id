/* istanbul ignore file */
import { productStub } from '../../stubs/product.stub';

export const productsServiceMock = {
    createProduct: jest.fn().mockResolvedValue(productStub),
    updateProduct: jest.fn().mockResolvedValue(productStub),
    deleteProduct: jest.fn().mockResolvedValue(productStub),
};
