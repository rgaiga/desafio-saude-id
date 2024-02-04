import { Test, TestingModule } from '@nestjs/testing';

import {
    CreateOrderMessageDTO,
    UpdateOrderMessageDTO,
    DeleteOrderMessageDTO,
} from '@orders/dtos';
import { OrdersRepository } from '@orders/repositories/orders.repository';
import { OrdersController } from '@orders/orders.controller';
import { OrdersService } from '@orders/orders.service';

import { ordersServiceMock } from '../mocks/orders-service.mock';
import { orderStub } from '../stubs/order.stub';

describe('Orders Controller', () => {
    let ordersController: OrdersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [
                { provide: OrdersService, useValue: ordersServiceMock },
                { provide: OrdersRepository, useValue: null },
            ],
        }).compile();

        ordersController = module.get<OrdersController>(OrdersController);
    });

    describe('createOrder()', () => {
        it('should return the created order', async () => {
            const orderId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: CreateOrderMessageDTO = { orderId, body };

            await expect(ordersController.createOrder(data)).resolves.toEqual(
                orderStub,
            );
        });
    });

    describe('updateOrder()', () => {
        it('should return the updated order', async () => {
            const orderId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: UpdateOrderMessageDTO = { orderId, body };

            await expect(ordersController.updateOrder(data)).resolves.toEqual(
                orderStub,
            );
        });
    });

    describe('deleteOrder()', () => {
        it('should return the deleted order', async () => {
            const orderId = orderStub.id;

            const data: DeleteOrderMessageDTO = { orderId };

            await expect(ordersController.deleteOrder(data)).resolves.toEqual(
                orderStub,
            );
        });
    });
});
