/* istanbul ignore file */
import { productStub } from '../stubs/product.stub';

export const productsRedisMock = {
    call: jest.fn().mockResolvedValue(JSON.stringify(productStub)),
};
