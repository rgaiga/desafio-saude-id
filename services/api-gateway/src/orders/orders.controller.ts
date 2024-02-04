import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';
import {
    ApiTags,
    ApiParam,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
} from '@nestjs/swagger';

import { OrderResponse } from '@orders/responses/orders.response';
import { CreateOrderDTO, UpdateOrderDTO } from '@orders/dtos';
import { Order } from '@orders/interfaces/order.interface';
import { OrdersService } from '@orders/orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get()
    @ApiOperation({ summary: 'Busca por todos as ordens' })
    @ApiOkResponse({ description: 'OK', type: [OrderResponse] })
    async getAllOrders(): Promise<Order[]> {
        return this.ordersService.getAllOrders();
    }

    @Get(':orderId')
    @ApiParam({
        name: 'orderId',
        description: 'ID da ordem',
        example: '00000000-0000-0000-0000-000000000000',
    })
    @ApiOperation({ summary: 'Busca pela ordem com o ID especificado' })
    @ApiOkResponse({ description: 'OK', type: OrderResponse })
    async getOrderById(@Param('orderId') orderId: string): Promise<Order> {
        return this.ordersService.getOrderById(orderId);
    }

    @Post()
    @ApiOperation({ summary: 'Cria uma nova ordem' })
    @ApiCreatedResponse({ description: 'Created', type: OrderResponse })
    async createOrder(@Body() body: CreateOrderDTO): Promise<Order> {
        return this.ordersService.createOrder(body);
    }

    @Put(':orderId')
    @ApiParam({
        name: 'orderId',
        description: 'ID da ordem',
        example: '00000000-0000-0000-0000-000000000000',
    })
    @ApiOperation({ summary: 'Atualiza a ordem com o ID especificado' })
    @ApiOkResponse({ description: 'OK', type: OrderResponse })
    async updateOrder(
        @Param('orderId') orderId: string,
        @Body() body: UpdateOrderDTO,
    ): Promise<Order> {
        return this.ordersService.updateOrder(orderId, body);
    }

    @Delete(':orderId')
    @ApiParam({
        name: 'orderId',
        description: 'ID da ordem',
        example: '00000000-0000-0000-0000-000000000000',
    })
    @ApiOperation({ summary: 'Remove a ordem com o ID especificado' })
    @ApiOkResponse({ description: 'OK', type: OrderResponse })
    async deleteOrder(@Param('orderId') orderId: string): Promise<Order> {
        return this.ordersService.deleteOrder(orderId);
    }
}
