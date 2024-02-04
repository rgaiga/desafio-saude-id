import { Controller, Logger } from '@nestjs/common';
import {
    MessagePattern,
    Payload,
    Ctx,
    RmqContext,
} from '@nestjs/microservices';

import {
    GetUsersMessageDTO,
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

    @MessagePattern({ cmd: 'get_users' })
    async getUsers(
        @Payload() data: GetUsersMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<User | User[]> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        if (data.userId) return this.usersService.getUserById(data.userId);

        return this.usersService.getAllUsers();
    }

    @MessagePattern({ cmd: 'create_user' })
    async createUser(
        @Payload() data: CreateUserMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<User> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.usersService.createUser(data.body);
    }

    @MessagePattern({ cmd: 'update_user' })
    async updateUser(
        @Payload() data: UpdateUserMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<User> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.usersService.updateUser(data.userId, data.body);
    }

    @MessagePattern({ cmd: 'delete_user' })
    async deleteUser(
        @Payload() data: DeleteUserMessageDTO,
        @Ctx() context?: RmqContext,
    ): Promise<User> {
        this.logger.log(`Received message: ${context?.getPattern()}`);
        this.logger.log(data);

        return this.usersService.deleteUser(data.userId);
    }
}
