import { Controller, Logger } from '@nestjs/common';
import {
    MessagePattern,
    Payload,
    Ctx,
    RmqContext,
} from '@nestjs/microservices';

import {
    GetOrdersMessageDTO,
    CreateOrderMessageDTO,
    UpdateOrderMessageDTO,
    DeleteOrderMessageDTO,
} from '@orders/dtos';
import { Order } from '@orders/interfaces/order.interface';
import { OrdersService } from '@orders/orders.service';

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);

    constructor(private readonly ordersService: OrdersService) {}

    @MessagePattern({ cmd: 'get_orders' })
    async getOrders(
        @Payload() data: GetOrdersMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Order | Order[]> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        if (data.orderId) return this.ordersService.getOrderById(data.orderId);

        return this.ordersService.getAllOrders();
    }

    @MessagePattern({ cmd: 'create_order' })
    async createOrder(
        @Payload() data: CreateOrderMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Order> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.ordersService.createOrder(data.body);
    }

    @MessagePattern({ cmd: 'update_order' })
    async updateOrder(
        @Payload() data: UpdateOrderMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Order> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.ordersService.updateOrder(data.orderId, data.body);
    }

    @MessagePattern({ cmd: 'delete_order' })
    async deleteOrder(
        @Payload() data: DeleteOrderMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Order> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.ordersService.deleteOrder(data.orderId);
    }
}
