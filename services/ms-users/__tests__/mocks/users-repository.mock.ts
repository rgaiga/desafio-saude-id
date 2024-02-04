/* istanbul ignore file */
import { userStub } from '../stubs/user.stub';

export const usersRepositoryMock = {
    getAllUsers: jest.fn().mockResolvedValue([userStub]),
    getUserById: jest.fn().mockResolvedValue(userStub),
    createUser: jest.fn().mockResolvedValue(userStub),
    updateUser: jest.fn().mockResolvedValue(userStub),
    deleteUser: jest.fn().mockResolvedValue(userStub),
};