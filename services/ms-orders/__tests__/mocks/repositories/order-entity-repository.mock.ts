/* istanbul ignore file */
import { orderStub } from '../../stubs/order.stub';

export const orderEntityRepositoryMock = {
    save: jest.fn().mockResolvedValue(orderStub),
    findOneBy: jest.fn().mockResolvedValue(orderStub),
    softRemove: jest.fn().mockResolvedValue(orderStub),
    createQueryBuilder: jest.fn().mockImplementation(() => ({
        withDeleted: jest.fn().mockImplementation(() => ({
            leftJoinAndSelect: jest.fn().mockImplementation(() => ({
                select: jest.fn().mockImplementation(() => ({
                    getMany: jest.fn().mockResolvedValue([orderStub]),
                    where: jest.fn().mockImplementation(() => ({
                        getOne: jest.fn().mockReturnThis().mockResolvedValue(orderStub),
                    })),
                })),
            })),
        })),
        leftJoinAndSelect: jest.fn().mockImplementation(() => ({
            select: jest.fn().mockImplementation(() => ({
                getMany: jest.fn().mockResolvedValue([orderStub]),
                where: jest.fn().mockImplementation(() => ({
                    getOne: jest.fn().mockReturnThis().mockResolvedValue(orderStub),
                })),
            })),
        })),
    })),
};
