/* istanbul ignore file */
import { userStub } from '../../stubs/user.stub';

export const usersServiceMock = {
    createUser: jest.fn().mockResolvedValue(userStub),
    updateUser: jest.fn().mockResolvedValue(userStub),
    deleteUser: jest.fn().mockResolvedValue(userStub),
};
