/* istanbul ignore file */
import { productStub } from '../stubs/product.stub';

export const productEntityRepositoryMock = {
    save: jest.fn().mockResolvedValue(productStub),
    findOneBy: jest.fn().mockResolvedValue(productStub),
    softRemove: jest.fn().mockResolvedValue(productStub),
    createQueryBuilder: jest.fn().mockImplementation(() => ({
        withDeleted: jest.fn().mockImplementation(() => ({
            select: jest.fn().mockImplementation(() => ({
                getMany: jest.fn().mockResolvedValue([productStub]),
                where: jest.fn().mockImplementation(() => ({
                    getOne: jest.fn().mockResolvedValue(productStub),
                })),
            })),
        })),
        select: jest.fn().mockImplementation(() => ({
            getMany: jest.fn().mockResolvedValue([productStub]),
            where: jest.fn().mockImplementation(() => ({
                getOne: jest.fn().mockResolvedValue(productStub),
            })),
        })),
    })),
};
