import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

import {
    CreateUserMessageDTO,
    UpdateUserMessageDTO,
    DeleteUserMessageDTO,
} from '@users/dtos';
import { User } from '@users/interfaces/user.interface';
import { UsersService } from '@users/users.service';

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) {}

    @EventPattern('user.created')
    async createUser(
        @Payload() data: CreateUserMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<User> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.usersService.createUser(data.userId, data.body);
    }

    @EventPattern('user.updated')
    async updateUser(
        @Payload() data: UpdateUserMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<User> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.usersService.updateUser(data.userId, data.body);
    }

    @EventPattern('user.deleted')
    async deleteUser(
        @Payload() data: DeleteUserMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<User> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.usersService.deleteUser(data.userId);
    }
}
