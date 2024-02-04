import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { OrdersController } from '@orders/orders.controller';
import { OrdersService } from '@orders/orders.service';

import { orderStub } from '../stubs/order.stub';

describe('Orders Controller', () => {
    let ordersService: OrdersService;
    let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [
                OrdersService,
                {
                    provide: 'ORDERS_SERVICE',
                    useValue: null,
                },
            ],
        }).compile();

        ordersService = module.get<OrdersService>(OrdersService);
        app = module.createNestApplication();
        await app.init();
    });

    describe('getAllOrders()', () => {
        it('should return all orders and status code 200', async () => {
            const expectedResult = [orderStub];

            jest.spyOn(ordersService, 'getAllOrders').mockResolvedValue(
                expectedResult,
            );

            const { status, body } = await request(app.getHttpServer()).get(
                '/orders',
            );

            expect(status).toBe(200);
            expect(body).toEqual(expectedResult);
        });
    });

    describe('getOrderById()', () => {
        it('should return the order with matching "orderId" and status code 200', async () => {
            const orderId = orderStub.id;

            const expectedResult = orderStub;

            jest.spyOn(ordersService, 'getOrderById').mockResolvedValue(
                expectedResult,
            );

            const { status, body } = await request(app.getHttpServer()).get(
                `/orders/${orderId}`,
            );

            expect(status).toBe(200);
            expect(body).toEqual(expectedResult);
        });
    });

    describe('createOrder()', () => {
        it('should return the created order and status code 201', async () => {
            const order = { ...orderStub };
            delete order.id;
            delete order.created_at;
            delete order.updated_at;

            const expectedResult = orderStub;

            jest.spyOn(ordersService, 'createOrder').mockResolvedValue(
                expectedResult,
            );

            const { status, body } = await request(app.getHttpServer()).post(
                '/orders',
            );

            expect(status).toBe(201);
            expect(body).toEqual(expectedResult);
        });
    });

    describe('updateOrder()', () => {
        it('should return the updated order and status code 200', async () => {
            const orderId = orderStub.id;

            const order = { ...orderStub };
            delete order.id;
            delete order.created_at;
            delete order.updated_at;

            const expectedResult = orderStub;

            jest.spyOn(ordersService, 'updateOrder').mockResolvedValue(
                expectedResult,
            );

            const { status, body } = await request(app.getHttpServer()).put(
                `/orders/${orderId}`,
            );

            expect(status).toBe(200);
            expect(body).toEqual(expectedResult);
        });
    });

    describe('deleteOrder()', () => {
        it('should return the deleted order and status code 200', async () => {
            const orderId = orderStub.id;

            const expectedResult = orderStub;

            jest.spyOn(ordersService, 'deleteOrder').mockResolvedValue(
                expectedResult,
            );

            const { status, body } = await request(app.getHttpServer()).delete(
                `/orders/${orderId}`,
            );

            expect(status).toBe(200);
            expect(body).toEqual(expectedResult);
        });
    });
});
