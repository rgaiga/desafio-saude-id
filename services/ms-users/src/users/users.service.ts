import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateUserDTO, UpdateUserDTO } from '@users/dtos';
import { User } from '@users/interfaces/user.interface';
import { UsersRepository } from '@users/repositories/users.repository';

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
        const createdUser = await this.usersRepository.createUser(body);

        this.ordersClient.emit('user.created', {
            userId: createdUser.id,
            body: { ...createdUser },
        });

        return createdUser;
    }

    async updateUser(userId: string, body: UpdateUserDTO): Promise<User> {
        const updatedUser = await this.usersRepository.updateUser(userId, body);

        this.ordersClient.emit('user.updated', {
            userId,
            body: {
                ...updatedUser,
            },
        });

        return updatedUser;
    }

    async deleteUser(userId: string): Promise<User> {
        const deletedUser = await this.usersRepository.deleteUser(userId);

        this.ordersClient.emit('user.deleted', {
            userId,
        });

        return deletedUser;
    }
}
