import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { UsersService } from '@users/users.service';

import { clientProxyMock } from '../mocks/client-proxy.mock';
import { userStub } from '../stubs/user.stub';

describe('Users Service', () => {
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: 'USERS_SERVICE', useValue: clientProxyMock },
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
    });

    describe('getAllUsers()', () => {
        it('should return all users', async () => {
            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next([userStub]);
                    s.complete();
                }),
            );

            await expect(usersService.getAllUsers()).resolves.toEqual([
                userStub,
            ]);
        });

        it('should throw an error', async () => {
            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(usersService.getAllUsers()).rejects.toThrow();
        });
    });

    describe('getUserById()', () => {
        it('should return the user with matching "userId"', async () => {
            const userId = userStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(userStub);
                    s.complete();
                }),
            );

            await expect(usersService.getUserById(userId)).resolves.toEqual(
                userStub,
            );
        });

        it('should throw an error', async () => {
            const userId = userStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(usersService.getUserById(userId)).rejects.toThrow();
        });
    });

    describe('createUser()', () => {
        it('should return the created user', async () => {
            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(userStub);
                    s.complete();
                }),
            );

            await expect(usersService.createUser(body)).resolves.toEqual(
                userStub,
            );
        });

        it('should throw an error', async () => {
            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(usersService.createUser(body)).rejects.toThrow();
        });
    });

    describe('updateUser()', () => {
        it('should return the updated user', async () => {
            const userId = userStub.id;

            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(userStub);
                    s.complete();
                }),
            );

            await expect(
                usersService.updateUser(userId, body),
            ).resolves.toEqual(userStub);
        });

        it('should throw an error', async () => {
            const userId = userStub.id;

            const body = { ...userStub };
            delete body.id;
            delete body.created_at;
            delete body.updated_at;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(
                usersService.updateUser(userId, body),
            ).rejects.toThrow();
        });
    });

    describe('deleteUser()', () => {
        it('should return the deleted user', async () => {
            const userId = userStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next(userStub);
                    s.complete();
                }),
            );

            await expect(usersService.deleteUser(userId)).resolves.toEqual(
                userStub,
            );
        });

        it('should throw an error', async () => {
            const userId = userStub.id;

            clientProxyMock.send.mockReturnValue(
                new Observable((s) => {
                    s.next({ error: true });
                    s.complete();
                }),
            );

            await expect(usersService.deleteUser(userId)).rejects.toThrow();
        });
    });
});
