/* istanbul ignore file */
import { orderStub } from '../stubs/order.stub';

export const ordersRepositoryMock = {
    getOrderById: jest.fn().mockResolvedValue(orderStub),
    createOrder: jest.fn().mockResolvedValue(orderStub),
    updateOrder: jest.fn().mockResolvedValue(orderStub),
    deleteOrder: jest.fn().mockResolvedValue(orderStub),
};
