import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { User } from './interfaces/user.interface';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async createUser(userId: string, body: CreateUserDTO): Promise<User> {
        return this.usersRepository.createUser(userId, body);
    }

    async updateUser(userId: string, body: UpdateUserDTO): Promise<User> {
        return this.usersRepository.updateUser(userId, body);
    }

    async deleteUser(userId: string): Promise<User> {
        return this.usersRepository.deleteUser(userId);
    }
}
