/* istanbul ignore file */
import { Product } from '@products/interfaces/product.interface';

export const productStub: Product = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Name',
    description: 'Description',
    sku: 'SKU',
    unit_price: 100,
    quantity_available: 100,
    created_at: '2001-01-01T00:00:00.000Z',
    updated_at: '2001-01-01T00:00:00.000Z',
};
