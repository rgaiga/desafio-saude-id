import { Test, TestingModule } from '@nestjs/testing';

import {
    CreateUserMessageDTO,
    UpdateUserMessageDTO,
    DeleteUserMessageDTO,
} from '@users/dtos';
import { UsersRepository } from '@users/repositories/users.repository';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';

import { usersServiceMock } from '../mocks/services/users-service.mock';
import { userStub } from '../stubs/user.stub';

describe('Users Controller', () => {
    let usersController: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: usersServiceMock },
                { provide: UsersRepository, useValue: null },
            ],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
    });

    describe('createUser()', () => {
        it('should return the created user', async () => {
            const userId = userStub.id;

            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: CreateUserMessageDTO = { userId, body };

            await expect(usersController.createUser(data)).resolves.toEqual(
                userStub,
            );
        });
    });

    describe('updateUser()', () => {
        it('should return the updated user', async () => {
            const userId = userStub.id;

            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: UpdateUserMessageDTO = { userId, body };

            await expect(usersController.updateUser(data)).resolves.toEqual(
                userStub,
            );
        });
    });

    describe('deleteUser()', () => {
        it('should return the deleted user', async () => {
            const userId = userStub.id;

            const data: DeleteUserMessageDTO = { userId };

            await expect(usersController.deleteUser(data)).resolves.toEqual(
                userStub,
            );
        });
    });
});
