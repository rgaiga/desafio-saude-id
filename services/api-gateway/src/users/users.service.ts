import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CreateUserDTO, UpdateUserDTO } from '@users/dtos';
import { User } from '@users/interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    ) {}

    async getAllUsers(): Promise<User[]> {
        const response = await lastValueFrom(
            this.usersClient.send({ cmd: 'get_users' }, {}),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async getUserById(userId: string): Promise<User> {
        const response = await lastValueFrom(
            this.usersClient.send({ cmd: 'get_users' }, { userId }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async createUser(body: CreateUserDTO): Promise<User> {
        const response = await lastValueFrom(
            this.usersClient.send({ cmd: 'create_user' }, { body }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async updateUser(userId: string, body: UpdateUserDTO): Promise<User> {
        const response = await lastValueFrom(
            this.usersClient.send({ cmd: 'update_user' }, { userId, body }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }

    async deleteUser(userId: string): Promise<User> {
        const response = await lastValueFrom(
            this.usersClient.send({ cmd: 'delete_user' }, { userId }),
        );

        if (response.error)
            throw new HttpException(response, response.statusCode);

        return response;
    }
}
