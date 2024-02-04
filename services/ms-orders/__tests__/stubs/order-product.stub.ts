/* istanbul ignore file */
import { OrderProduct } from '@orders/interfaces/order-product.interface';

export const orderProductStub: OrderProduct = {
    id: '00000000-0000-0000-0000-000000000000',
    order_id: '00000000-0000-0000-0000-000000000000',
    product_id: '00000000-0000-0000-0000-000000000000',
    quantity: 100,
    unit_price: 100,
    created_at: '2001-01-01T00:00:00.000Z',
    updated_at: '2001-01-01T00:00:00.000Z',
};
