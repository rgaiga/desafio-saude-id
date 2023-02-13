import { Test, TestingModule } from '@nestjs/testing';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersService } from './orders.service';
import { ordersRepositoryMock } from '../__tests__/mocks/repositories/orders-repository.mock';
import { clientProxyMock } from '../__tests__/mocks/services/client-proxy.mock';
import { orderStub } from '../__tests__/stubs/order.stub';

describe('OrdersService', () => {
    let ordersService: OrdersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                {
                    provide: OrdersRepository,
                    useValue: ordersRepositoryMock,
                },
                { provide: 'STOCK_SERVICE', useValue: clientProxyMock },
            ],
        }).compile();

        ordersService = module.get<OrdersService>(OrdersService);
    });

    describe('getAllOrders', () => {
        it('should return all orders', async () => {
            await expect(ordersService.getAllOrders()).resolves.toEqual([orderStub]);
        });
    });

    describe('getOrderById', () => {
        it('should return the order with matching "orderId"', async () => {
            const orderId = orderStub.id;

            await expect(ordersService.getOrderById(orderId)).resolves.toEqual(orderStub);
        });
    });

    describe('createOrder', () => {
        it('should return the created order', async () => {
            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(ordersService.createOrder(body)).resolves.toEqual(orderStub);

            expect(clientProxyMock.emit).toHaveBeenCalledWith('order.created', {
                orderId: orderStub.id,
                body: { ...orderStub },
            });
        });
    });

    describe('updateOrder', () => {
        it('should return the updated order', async () => {
            const orderId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(ordersService.updateOrder(orderId, body)).resolves.toEqual(orderStub);

            expect(clientProxyMock.emit).toHaveBeenCalledWith('order.updated', {
                orderId: orderStub.id,
                body: { ...orderStub },
            });
        });
    });

    describe('deleteOrder', () => {
        it('should return the deleted order', async () => {
            const orderId = orderStub.id;

            await expect(ordersService.deleteOrder(orderId)).resolves.toEqual(orderStub);

            expect(clientProxyMock.emit).toHaveBeenCalledWith('order.deleted', {
                orderId: orderStub.id,
            });
        });
    });
});
