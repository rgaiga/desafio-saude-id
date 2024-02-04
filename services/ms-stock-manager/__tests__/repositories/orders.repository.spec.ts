import { Test, TestingModule } from '@nestjs/testing';

import { OrdersRepository } from '@orders/repositories/orders.repository';

import { ordersRedisMock } from '../mocks/orders-redis.mock';
import { orderStub } from '../stubs/order.stub';

describe('Orders Repository', () => {
    let ordersRepository: OrdersRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersRepository,
                {
                    provide: 'RedisModule:default',
                    useValue: ordersRedisMock,
                },
            ],
        }).compile();

        ordersRepository = module.get<OrdersRepository>(OrdersRepository);
    });

    describe('getOrderById()', () => {
        it('should return the order with matching "orderId"', async () => {
            const userId = orderStub.id;

            await expect(
                ordersRepository.getOrderById(userId),
            ).resolves.toEqual(orderStub);
        });

        it('should throw an error', async () => {
            const userId = orderStub.id;

            ordersRedisMock.call.mockRejectedValueOnce(null);

            await expect(
                ordersRepository.getOrderById(userId),
            ).rejects.toThrow();
        });
    });

    describe('createOrder()', () => {
        it('should return the created order', async () => {
            const userId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(
                ordersRepository.createOrder(userId, body),
            ).resolves.toEqual(orderStub);
        });

        it('should throw an error', async () => {
            const userId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            ordersRedisMock.call.mockRejectedValueOnce(null);

            await expect(
                ordersRepository.createOrder(userId, body),
            ).rejects.toThrow();
        });
    });

    describe('updateOrder()', () => {
        it('should return the updated order', async () => {
            const orderId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(
                ordersRepository.updateOrder(orderId, body),
            ).resolves.toEqual(orderStub);
        });

        it('should throw an error', async () => {
            const userId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            ordersRedisMock.call.mockRejectedValueOnce(null);

            await expect(
                ordersRepository.updateOrder(userId, body),
            ).rejects.toThrow();
        });
    });

    describe('deleteOrder()', () => {
        it('should return the deleted order', async () => {
            const orderId = orderStub.id;

            await expect(
                ordersRepository.deleteOrder(orderId),
            ).resolves.toEqual(orderStub);
        });

        it('should throw an error', async () => {
            const userId = orderStub.id;

            ordersRedisMock.call.mockRejectedValueOnce(null);

            await expect(
                ordersRepository.deleteOrder(userId),
            ).rejects.toThrow();
        });
    });
});
