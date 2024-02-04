import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { OrdersService } from '@orders/orders.service';

import { clientProxyMock } from '../mocks/client-proxy.mock';
import { orderStub } from '../stubs/order.stub';

describe('Orders Service', () => {
    let ordersService: OrdersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                { provide: 'ORDERS_SERVICE', useValue: clientProxyMock },
            ],
        }).compile();

        ordersService = module.get<OrdersService>(OrdersService);
    });

    describe('getAllOrders()', () => {
        it('should return all orders', async () => {
            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next([orderStub]);
                    s.complete();
                }),
            );

            await expect(ordersService.getAllOrders()).resolves.toEqual([
                orderStub,
            ]);
        });

        it('should throw an error', async () => {
            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(ordersService.getAllOrders()).rejects.toThrow();
        });
    });

    describe('getOrderById()', () => {
        it('should return the order with matching "orderId"', async () => {
            const orderId = orderStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(orderStub);
                    s.complete();
                }),
            );

            await expect(ordersService.getOrderById(orderId)).resolves.toEqual(
                orderStub,
            );
        });

        it('should throw an error', async () => {
            const orderId = orderStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(ordersService.getOrderById(orderId)).rejects.toThrow();
        });
    });

    describe('createOrder()', () => {
        it('should return the created order', async () => {
            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(orderStub);
                    s.complete();
                }),
            );

            await expect(ordersService.createOrder(body)).resolves.toEqual(
                orderStub,
            );
        });

        it('should throw an error', async () => {
            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(ordersService.createOrder(body)).rejects.toThrow();
        });
    });

    describe('updateOrder()', () => {
        it('should return the updated order', async () => {
            const orderId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(orderStub);
                    s.complete();
                }),
            );

            await expect(
                ordersService.updateOrder(orderId, body),
            ).resolves.toEqual(orderStub);
        });

        it('should throw an error', async () => {
            const orderId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(
                ordersService.updateOrder(orderId, body),
            ).rejects.toThrow();
        });
    });

    describe('deleteOrder()', () => {
        it('should return the deleted order', async () => {
            const orderId = orderStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(orderStub);
                    s.complete();
                }),
            );

            await expect(ordersService.deleteOrder(orderId)).resolves.toEqual(
                orderStub,
            );
        });

        it('should throw an error', async () => {
            const orderId = orderStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(ordersService.deleteOrder(orderId)).rejects.toThrow();
        });
    });
});
