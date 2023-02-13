import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { orderStub } from '../__tests__/stubs/order.stub';

describe('OrdersController', () => {
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

    describe('getAllOrders', () => {
        it('should return all orders and status code 200', async () => {
            const result = [orderStub];

            jest.spyOn(ordersService, 'getAllOrders').mockImplementation(async () => result);

            const { status, body } = await request(app.getHttpServer()).get('/orders');

            expect(status).toBe(200);
            expect(body).toEqual(result);
        });
    });

    describe('getOrderById', () => {
        it('should return the order with matching "orderId" and status code 200', async () => {
            const orderId = orderStub.id;

            const result = orderStub;

            jest.spyOn(ordersService, 'getOrderById').mockImplementation(async () => result);

            const { status, body } = await request(app.getHttpServer()).get(`/orders/${orderId}`);

            expect(status).toBe(200);
            expect(body).toEqual(result);
        });
    });

    describe('createOrder', () => {
        it('should return the created order and status code 201', async () => {
            const order = { ...orderStub };
            delete order.id;
            delete order.created_at;
            delete order.updated_at;

            const result = orderStub;

            jest.spyOn(ordersService, 'createOrder').mockImplementation(async () => result);

            const { status, body } = await request(app.getHttpServer()).post('/orders');

            expect(status).toBe(201);
            expect(body).toEqual(result);
        });
    });

    describe('updateOrder', () => {
        it('should return the updated order and status code 200', async () => {
            const orderId = orderStub.id;

            const order = { ...orderStub };
            delete order.id;
            delete order.created_at;
            delete order.updated_at;

            const result = orderStub;

            jest.spyOn(ordersService, 'updateOrder').mockImplementation(async () => result);

            const { status, body } = await request(app.getHttpServer()).put(`/orders/${orderId}`);

            expect(status).toBe(200);
            expect(body).toEqual(result);
        });
    });

    describe('deleteOrder', () => {
        it('should return the deleted order and status code 200', async () => {
            const orderId = orderStub.id;

            const result = orderStub;

            jest.spyOn(ordersService, 'deleteOrder').mockImplementation(async () => result);

            const { status, body } = await request(app.getHttpServer()).delete(
                `/orders/${orderId}`,
            );

            expect(status).toBe(200);
            expect(body).toEqual(result);
        });
    });
});
