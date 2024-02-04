import { Test, TestingModule } from '@nestjs/testing';

import { UsersRepository } from '@users/repositories/users.repository';
import { UsersService } from '@users/users.service';

import { usersRepositoryMock } from '../mocks/repositories/users-repository.mock';
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
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
    });

    describe('createUser()', () => {
        it('should return the created user', async () => {
            const userId = userStub.id;

            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(
                usersService.createUser(userId, body),
            ).resolves.toEqual(userStub);
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
        });
    });

    describe('deleteUser()', () => {
        it('should return the deleted user', async () => {
            const userId = userStub.id;

            await expect(usersService.deleteUser(userId)).resolves.toEqual(
                userStub,
            );
        });
    });
});
