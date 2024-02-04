/* istanbul ignore file */
import { userStub } from '../stubs/user.stub';

export const userEntityRepositoryMock = {
    save: jest.fn().mockResolvedValue(userStub),
    findOneBy: jest.fn().mockResolvedValue(userStub),
    softRemove: jest.fn().mockResolvedValue(userStub),
    createQueryBuilder: jest.fn().mockImplementation(() => ({
        withDeleted: jest.fn().mockImplementation(() => ({
            select: jest.fn().mockImplementation(() => ({
                getMany: jest.fn().mockResolvedValue([userStub]),
                where: jest.fn().mockImplementation(() => ({
                    getOne: jest.fn().mockResolvedValue(userStub),
                })),
            })),
        })),
        select: jest.fn().mockImplementation(() => ({
            getMany: jest.fn().mockResolvedValue([userStub]),
            where: jest.fn().mockImplementation(() => ({
                getOne: jest.fn().mockReturnThis().mockResolvedValue(userStub),
            })),
        })),
    })),
};
