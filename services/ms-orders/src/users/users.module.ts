/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@users/entities/user.entity';
import { UsersRepository } from '@users/repositories/users.repository';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
})
export class UsersModule {}
