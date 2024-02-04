/* istanbul ignore file */
import { User } from '@users/interfaces/user.interface';

export const userStub: User = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Name',
    birthdate: '2001-01-01',
    email: 'example@mail.com',
    phone_number: '+5551999999999',
    city: 'City',
    state: 'State',
    country: 'Country',
    address: 'Address',
    complement: 'Complement',
    zip_code: '00000-000',
    created_at: '2001-01-01T00:00:00.000Z',
    updated_at: '2001-01-01T00:00:00.000Z',
};
