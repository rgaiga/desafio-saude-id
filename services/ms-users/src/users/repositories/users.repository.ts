import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '../../http-exceptions/user-not-found.http-exception';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '../interfaces/user.interface';

const fields = [
    'user.id',
    'user.name',
    'user.birthdate',
    'user.email',
    'user.phone_number',
    'user.city',
    'user.state',
    'user.country',
    'user.address',
    'user.complement',
    'user.zip_code',
    'user.created_at',
    'user.updated_at',
];

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return this.userEntityRepository.createQueryBuilder('user').select(fields).getMany();
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userEntityRepository
            .createQueryBuilder('user')
            .select(fields)
            .where('user.id = :userId', { userId })
            .getOne();

        if (!user) throw new UserNotFoundException(userId);

        return user;
    }

    async createUser(body: CreateUserDTO): Promise<User> {
        const user = await this.userEntityRepository.save(body);

        return this.userEntityRepository
            .createQueryBuilder('user')
            .select(fields)
            .where('user.id = :userId', { userId: user.id })
            .getOne();
    }

    async updateUser(userId: string, body: UpdateUserDTO): Promise<User> {
        const user = await this.userEntityRepository.findOneBy({ id: userId });

        if (!user) throw new UserNotFoundException(userId);

        await this.userEntityRepository.save({ ...user, ...body });

        return this.userEntityRepository
            .createQueryBuilder('user')
            .select(fields)
            .where('user.id = :userId', { userId })
            .getOne();
    }

    async deleteUser(userId: string): Promise<User> {
        const user = await this.userEntityRepository.findOneBy({ id: userId });

        if (!user) throw new UserNotFoundException(userId);

        await this.userEntityRepository.softRemove(user);

        return this.userEntityRepository
            .createQueryBuilder('user')
            .withDeleted()
            .select(fields)
            .where('user.id = :userId', { userId })
            .getOne();
    }
}
