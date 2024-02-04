import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersRepository } from '@users/repositories/users.repository';
import { UserEntity } from '@users/entities/user.entity';

import { userEntityRepositoryMock } from '../mocks/repositories/user-entity-repository.mock';
import { userStub } from '../stubs/user.stub';

describe('Users Repository', () => {
    let usersRepository: UsersRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersRepository,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: userEntityRepositoryMock,
                },
            ],
        }).compile();

        usersRepository = module.get<UsersRepository>(UsersRepository);
    });

    describe('createUser()', () => {
        it('should return the created user', async () => {
            const userId = userStub.id;

            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            await expect(
                usersRepository.createUser(userId, body),
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
                usersRepository.updateUser(userId, body),
            ).resolves.toEqual(userStub);
        });

        it('should throw an error if user with matching "userId" is not found', async () => {
            const userId = 'INVALID_ID';

            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            userEntityRepositoryMock.findOneBy.mockResolvedValueOnce(null);

            await expect(
                usersRepository.updateUser(userId, body),
            ).rejects.toThrow();
        });
    });

    describe('deleteUser()', () => {
        it('should return the deleted user', async () => {
            const userId = userStub.id;

            await expect(usersRepository.deleteUser(userId)).resolves.toEqual(
                userStub,
            );
        });

        it('should throw an error if user with matching "userId" is not found', async () => {
            const userId = 'INVALID_ID';

            userEntityRepositoryMock.findOneBy.mockResolvedValueOnce(null);

            await expect(usersRepository.deleteUser(userId)).rejects.toThrow();
        });
    });
});
