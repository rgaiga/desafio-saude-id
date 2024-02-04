/* istanbul ignore file */
import { orderProductStub } from '../../stubs/order-product.stub';

export const orderProductEntityRepositoryMock = {
    save: jest.fn().mockResolvedValue(orderProductStub),
    findOneBy: jest.fn().mockResolvedValue(orderProductStub),
    softRemove: jest.fn().mockResolvedValue(orderProductStub),
    createQueryBuilder: jest.fn().mockImplementation(() => ({
        withDeleted: jest.fn().mockImplementation(() => ({
            select: jest.fn().mockImplementation(() => ({
                getMany: jest.fn().mockResolvedValue([orderProductStub]),
                where: jest.fn().mockImplementation(() => ({
                    getOne: jest.fn().mockResolvedValue(orderProductStub),
                })),
            })),
        })),
        select: jest.fn().mockImplementation(() => ({
            getMany: jest.fn().mockResolvedValue([orderProductStub]),
            where: jest.fn().mockImplementation(() => ({
                getOne: jest.fn().mockReturnThis().mockResolvedValue(orderProductStub),
            })),
        })),
    })),
};
