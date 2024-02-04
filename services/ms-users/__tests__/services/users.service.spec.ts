import { Test, TestingModule } from '@nestjs/testing';

import { UsersRepository } from '@users/repositories/users.repository';
import { UsersService } from '@users/users.service';

import { usersRepositoryMock } from '../mocks/users-repository.mock';
import { clientProxyMock } from '../mocks/client-proxy.mock';
import { userStub } from '../stubs/user.stub';

describe('Users Service', () => {
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: UsersRepository,
                    useValue: usersRepositoryMock,
                },
                { provide: 'ORDERS_SERVICE', useValue: clientProxyMock },
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
    });

    describe('getAllUsers()', () => {
        it('should return all users', async () => {
            await expect(usersService.getAllUsers()).resolves.toEqual([
                userStub,
            ]);
        });
    });

    describe('getUserById()', () => {
        it('should return the user with matching "userId"', async () => {
            const userId = userStub.id;

            await expect(usersService.getUserById(userId)).resolves.toEqual(
                userStub,
            );
        });
    });

    describe('createUser()', () => {
        it('should return the created user', async () => {
            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(usersService.createUser(body)).resolves.toEqual(
                userStub,
            );

            expect(clientProxyMock.emit).toHaveBeenCalledWith('user.created', {
                userId: userStub.id,
                body: { ...userStub },
            });
        });
    });

    describe('updateUser()', () => {
        it('should return the updated user', async () => {
            const userId = userStub.id;

            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(
                usersService.updateUser(userId, body),
            ).resolves.toEqual(userStub);

            expect(clientProxyMock.emit).toHaveBeenCalledWith('user.updated', {
                userId: userStub.id,
                body: { ...userStub },
            });
        });
    });

    describe('deleteUser()', () => {
        it('should return the deleted user', async () => {
            const userId = userStub.id;

            await expect(usersService.deleteUser(userId)).resolves.toEqual(
                userStub,
            );

            expect(clientProxyMock.emit).toHaveBeenCalledWith('user.deleted', {
                userId: userStub.id,
            });
        });
    });
});
