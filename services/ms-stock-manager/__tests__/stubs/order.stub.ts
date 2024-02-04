/* istanbul ignore file */
import { Order } from '@orders/interfaces/order.interface';

export const orderStub: Order = {
    id: '00000000-0000-0000-0000-000000000000',
    user_id: '00000000-0000-0000-0000-000000000000',
    products: [
        {
            product_id: '00000000-0000-0000-0000-000000000000',
            quantity: 100,
            unit_price: 100,
        },
    ],
    total_quantity: 100,
    total_price: 100,
    status: 'Status',
    observation: 'Observation',
    created_at: '2001-01-01T00:00:00.000Z',
    updated_at: '2001-01-01T00:00:00.000Z',
};
