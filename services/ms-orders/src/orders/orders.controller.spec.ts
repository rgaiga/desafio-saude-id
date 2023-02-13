import { Test, TestingModule } from '@nestjs/testing';
import { GetOrdersMessageDTO } from './dtos/messages/get-orders-message.dto';
import { CreateOrderMessageDTO } from './dtos/messages/create-order-message.dto';
import { UpdateOrderMessageDTO } from './dtos/messages/update-order-message.dto';
import { DeleteOrderMessageDTO } from './dtos/messages/delete-order-message.dto';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ordersServiceMock } from '../__tests__/mocks/services/orders-service.mock';
import { orderStub } from '../__tests__/stubs/order.stub';

describe('OrdersController', () => {
    let ordersController: OrdersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [
                { provide: OrdersService, useValue: ordersServiceMock },
                { provide: OrdersRepository, useValue: null },
                { provide: 'ORDERS_SERVICE', useValue: null },
            ],
        }).compile();

        ordersController = module.get<OrdersController>(OrdersController);
    });

    describe('getOrders', () => {
        it('should return all orders', async () => {
            const data: GetOrdersMessageDTO = { orderId: null };

            await expect(ordersController.getOrders(data)).resolves.toEqual([orderStub]);
        });

        it('should return the order with matching "orderId"', async () => {
            const orderId = orderStub.id;

            const data: GetOrdersMessageDTO = { orderId };

            await expect(ordersController.getOrders(data)).resolves.toEqual(orderStub);
        });
    });

    describe('createOrder', () => {
        it('should return the created order', async () => {
            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: CreateOrderMessageDTO = { body };

            await expect(ordersController.createOrder(data)).resolves.toEqual(orderStub);
        });
    });

    describe('updateOrder', () => {
        it('should return the updated order', async () => {
            const orderId = orderStub.id;

            const body = { ...orderStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: UpdateOrderMessageDTO = { orderId, body };

            await expect(ordersController.updateOrder(data)).resolves.toEqual(orderStub);
        });
    });

    describe('deleteOrder', () => {
        it('should return the deleted order', async () => {
            const orderId = orderStub.id;

            const data: DeleteOrderMessageDTO = { orderId };

            await expect(ordersController.deleteOrder(data)).resolves.toEqual(orderStub);
        });
    });
});
