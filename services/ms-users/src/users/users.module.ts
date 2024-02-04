/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@users/entities/user.entity';
import { UsersRepository } from '@users/repositories/users.repository';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersRepository,
        {
            provide: 'ORDERS_SERVICE',
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [process.env.RABBITMQ_URL],
                        queue: process.env.RABBITMQ_ORDERS_QUEUE,
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
        },
    ],
})
export class UsersModule {}
