/* istanbul ignore file */
import { orderStub } from '../stubs/order.stub';

export const ordersRedisMock = {
    call: jest.fn().mockResolvedValue(JSON.stringify(orderStub)),
};
