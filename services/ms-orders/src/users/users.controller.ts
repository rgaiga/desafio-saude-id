import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { CreateUserMessageDTO } from './dtos/messages/create-user-message.dto';
import { UpdateUserMessageDTO } from './dtos/messages/update-user-message.dto';
import { DeleteUserMessageDTO } from './dtos/messages/delete-user-message.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

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
