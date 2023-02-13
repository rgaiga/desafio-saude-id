import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userStub } from '../__tests__/stubs/user.stub';

describe('UsersController', () => {
    let usersService: UsersService;
    let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: 'USERS_SERVICE',
                    useValue: null,
                },
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        app = module.createNestApplication();
        await app.init();
    });

    describe('getAllUsers', () => {
        it('should return all users and status code 200', async () => {
            const result = [userStub];

            jest.spyOn(usersService, 'getAllUsers').mockImplementation(async () => result);

            const { status, body } = await request(app.getHttpServer()).get('/users');

            expect(status).toBe(200);
            expect(body).toEqual(result);
        });
    });

    describe('getUserById', () => {
        it('should return the user with matching "userId" and status code 200', async () => {
            const userId = userStub.id;

            const result = userStub;

            jest.spyOn(usersService, 'getUserById').mockImplementation(async () => result);

            const { status, body } = await request(app.getHttpServer()).get(`/users/${userId}`);

            expect(status).toBe(200);
            expect(body).toEqual(result);
        });
    });

    describe('createUser', () => {
        it('should return the created user and status code 201', async () => {
            const user = { ...userStub };
            delete user.id;
            delete user.created_at;
            delete user.updated_at;

            const result = userStub;

            jest.spyOn(usersService, 'createUser').mockImplementation(async () => result);

            const { status, body } = await request(app.getHttpServer()).post('/users');

            expect(status).toBe(201);
            expect(body).toEqual(result);
        });
    });

    describe('updateUser', () => {
        it('should return the updated user and status code 200', async () => {
            const userId = userStub.id;

            const user = { ...userStub };
            delete user.id;
            delete user.created_at;
            delete user.updated_at;

            const result = userStub;

            jest.spyOn(usersService, 'updateUser').mockImplementation(async () => result);

            const { status, body } = await request(app.getHttpServer()).put(`/users/${userId}`);

            expect(status).toBe(200);
            expect(body).toEqual(result);
        });
    });

    describe('deleteUser', () => {
        it('should return the deleted user and status code 200', async () => {
            const userId = userStub.id;

            const result = userStub;

            jest.spyOn(usersService, 'deleteUser').mockImplementation(async () => result);

            const { status, body } = await request(app.getHttpServer()).delete(`/users/${userId}`);

            expect(status).toBe(200);
            expect(body).toEqual(result);
        });
    });
});
