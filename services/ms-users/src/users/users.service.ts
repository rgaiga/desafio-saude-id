import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { User } from './interfaces/user.interface';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return this.usersRepository.getAllUsers();
    }

    async getUserById(userId: string): Promise<User> {
        return this.usersRepository.getUserById(userId);
    }

    async createUser(body: CreateUserDTO): Promise<User> {
        const user = await this.usersRepository.createUser(body);

        this.ordersClient.emit('user.created', {
            userId: user.id,
            body: { ...user },
        });

        return user;
    }

    async updateUser(userId: string, body: UpdateUserDTO): Promise<User> {
        const user = await this.usersRepository.updateUser(userId, body);

        this.ordersClient.emit('user.updated', {
            userId,
            body: {
                ...user,
            },
        });

        return user;
    }

    async deleteUser(userId: string): Promise<User> {
        const user = await this.usersRepository.deleteUser(userId);

        this.ordersClient.emit('user.deleted', {
            userId,
        });

        return user;
    }
}
