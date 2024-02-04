import { Test, TestingModule } from '@nestjs/testing';

import { OrdersRepository } from '@orders/repositories/orders.repository';
import { OrdersService } from '@orders/orders.service';
import { ProductsService } from '@products/products.service';

import { ordersRepositoryMock } from '../mocks/orders-repository.mock';
import { productsServiceMock } from '../mocks/products-service.mock';
import { clientProxyMock } from '../mocks/client-proxy.mock';
import { orderStub } from '../stubs/order.stub';

describe('Orders Service', () => {
    let ordersService: OrdersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                {
                    provide: OrdersRepository,
                    useValue: ordersRepositoryMock,
                },
                {
                    provide: ProductsService,
                    useValue: productsServiceMock,
                },
                {
                    provide: 'PRODUCTS_SERVICE',
                    useValue: clientProxyMock,
                },
                {
                    provide: 'ORDERS_SERVICE',
                    useValue: clientProxyMock,
                },
            ],
        }).compile();

        ordersService = module.get<OrdersService>(OrdersService);
    });

    describe('createOrder()', () => {
        it('should return the created order', async () => {
            const orderId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(
                ordersService.createOrder(orderId, body),
            ).resolves.toEqual(orderStub);
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
                ordersService.updateOrder(orderId, body),
            ).resolves.toEqual(orderStub);
        });
    });

    describe('deleteOrder()', () => {
        it('should return the deleted order', async () => {
            const orderId = orderStub.id;

            const order = { ...orderStub };
            order.status = 'CONFIRMED';

            ordersRepositoryMock.getOrderById.mockResolvedValueOnce(order);

            await expect(ordersService.deleteOrder(orderId)).resolves.toEqual(
                orderStub,
            );
        });
    });

    describe('processOrder()', () => {
        it('should return the processed order', async () => {
            const orderId = orderStub.id;

            await expect(ordersService.processOrder(orderId)).resolves.toEqual(
                orderStub,
            );
        });
    });
});
