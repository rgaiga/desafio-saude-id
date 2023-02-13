import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { CreateOrderMessageDTO } from './dtos/messages/create-order-message.dto';
import { UpdateOrderMessageDTO } from './dtos/messages/update-order-message.dto';
import { DeleteOrderMessageDTO } from './dtos/messages/delete-order-message.dto';
import { Order } from './interfaces/order.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);

    constructor(private readonly ordersService: OrdersService) {}

    @EventPattern('order.created')
    async createOrder(
        @Payload() data: CreateOrderMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Order> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.ordersService.createOrder(data.orderId, data.body);
    }

    @EventPattern('order.updated')
    async updateOrder(
        @Payload() data: UpdateOrderMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Order> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.ordersService.updateOrder(data.orderId, data.body);
    }

    @EventPattern('order.deleted')
    async deleteOrder(
        @Payload() data: DeleteOrderMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<Order> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.ordersService.deleteOrder(data.orderId);
    }
}
