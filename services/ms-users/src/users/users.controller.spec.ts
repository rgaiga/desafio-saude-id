import { Test, TestingModule } from '@nestjs/testing';
import { GetUsersMessageDTO } from './dtos/messages/get-users-message.dto';
import { CreateUserMessageDTO } from './dtos/messages/create-user-message.dto';
import { UpdateUserMessageDTO } from './dtos/messages/update-user-message.dto';
import { DeleteUserMessageDTO } from './dtos/messages/delete-user-message.dto';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersServiceMock } from '../__tests__/mocks/users-service.mock';
import { userStub } from '../__tests__/stubs/user.stub';

describe('UsersController', () => {
    let usersController: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: usersServiceMock },
                { provide: UsersRepository, useValue: null },
                { provide: 'ORDERS_SERVICE', useValue: null },
            ],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
    });

    describe('getUsers', () => {
        it('should return all users', async () => {
            const data: GetUsersMessageDTO = { userId: null };

            await expect(usersController.getUsers(data)).resolves.toEqual([userStub]);
        });

        it('should return the user with matching "userId"', async () => {
            const userId = userStub.id;

            const data: GetUsersMessageDTO = { userId };

            await expect(usersController.getUsers(data)).resolves.toEqual(userStub);
        });
    });

    describe('createUser', () => {
        it('should return the created user', async () => {
            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: CreateUserMessageDTO = { body };

            await expect(usersController.createUser(data)).resolves.toEqual(userStub);
        });
    });

    describe('updateUser', () => {
        it('should return the updated user', async () => {
            const userId = userStub.id;

            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            const data: UpdateUserMessageDTO = { userId, body };

            await expect(usersController.updateUser(data)).resolves.toEqual(userStub);
        });
    });

    describe('deleteUser', () => {
        it('should return the deleted user', async () => {
            const userId = userStub.id;

            const data: DeleteUserMessageDTO = { userId };

            await expect(usersController.deleteUser(data)).resolves.toEqual(userStub);
        });
    });
});
