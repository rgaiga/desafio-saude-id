import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { OrderEntity } from '../entities/order.entity';
import { OrderProductEntity } from '../entities/order-product.entity';
import { OrdersRepository } from '../repositories/orders.repository';
import { userEntityRepositoryMock } from '../../__tests__/mocks/repositories/user-entity-repository.mock';
import { productEntityRepositoryMock } from '../../__tests__/mocks/repositories/product-entity-repository.mock';
import { orderEntityRepositoryMock } from '../../__tests__/mocks/repositories/order-entity-repository.mock';
import { orderProductEntityRepositoryMock } from '../../__tests__/mocks/repositories/order-product-entity-repository.mock';
import { orderStub } from '../../__tests__/stubs/order.stub';

describe('OrdersRepository', () => {
    let ordersRepository: OrdersRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersRepository,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: userEntityRepositoryMock,
                },
                {
                    provide: getRepositoryToken(ProductEntity),
                    useValue: productEntityRepositoryMock,
                },
                {
                    provide: getRepositoryToken(OrderEntity),
                    useValue: orderEntityRepositoryMock,
                },
                {
                    provide: getRepositoryToken(OrderProductEntity),
                    useValue: orderProductEntityRepositoryMock,
                },
            ],
        }).compile();

        ordersRepository = module.get<OrdersRepository>(OrdersRepository);
    });

    describe('getAllOrders', () => {
        it('should return all orders', async () => {
            await expect(ordersRepository.getAllOrders()).resolves.toEqual([orderStub]);
        });
    });

    describe('getOrderById', () => {
        it('should return the order with matching "orderId"', async () => {
            const orderId = orderStub.id;

            await expect(ordersRepository.getOrderById(orderId)).resolves.toEqual(orderStub);
        });

        it('should throw an error if order with matching "orderId" is not found', async () => {
            const orderId = 'INVALID_ID';

            orderEntityRepositoryMock.createQueryBuilder.mockImplementationOnce(() => ({
                leftJoinAndSelect: jest.fn().mockImplementation(() => ({
                    select: jest.fn().mockImplementation(() => ({
                        where: jest.fn().mockImplementation(() => ({
                            getOne: jest.fn().mockResolvedValue(null),
                        })),
                    })),
                })),
            }));

            await expect(ordersRepository.getOrderById(orderId)).rejects.toThrow();
        });
    });

    describe('createOrder', () => {
        it('should return the created order', async () => {
            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(ordersRepository.createOrder(body)).resolves.toEqual(orderStub);
        });

        it('should throw an error if user with matching "user_id" is not found', async () => {
            const body = { ...orderStub, user_id: 'INVALID_ID' };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            userEntityRepositoryMock.findOneBy.mockResolvedValueOnce(null);

            await expect(ordersRepository.createOrder(body)).rejects.toThrow();
        });

        it('should throw an error if product with matching "product_id" is not found', async () => {
            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            body.products[0].product_id = 'INVALID_ID';

            productEntityRepositoryMock.findOneBy.mockResolvedValueOnce(null);

            await expect(ordersRepository.createOrder(body)).rejects.toThrow();
        });
    });

    describe('updateOrder', () => {
        it('should return the updated order', async () => {
            const orderId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(ordersRepository.updateOrder(orderId, body)).resolves.toEqual(orderStub);
        });

        it('should throw an error if order with matching "orderId" is not found', async () => {
            const orderId = 'INVALID_ID';

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            orderEntityRepositoryMock.findOneBy.mockResolvedValueOnce(null);

            await expect(ordersRepository.updateOrder(orderId, body)).rejects.toThrow();
        });
    });

    describe('deleteOrder', () => {
        it('should return the deleted order', async () => {
            const orderId = orderStub.id;

            await expect(ordersRepository.deleteOrder(orderId)).resolves.toEqual(orderStub);
        });

        it('should throw an error if order with matching "orderId" is not found', async () => {
            const orderId = 'INVALID_ID';

            orderEntityRepositoryMock.createQueryBuilder.mockImplementationOnce(() => ({
                leftJoinAndSelect: jest.fn().mockImplementation(() => ({
                    select: jest.fn().mockImplementation(() => ({
                        where: jest.fn().mockImplementation(() => ({
                            getOne: jest.fn().mockResolvedValue(null),
                        })),
                    })),
                })),
            }));

            await expect(ordersRepository.deleteOrder(orderId)).rejects.toThrow();
        });
    });
});
