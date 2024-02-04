/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
    @ApiProperty({
        description: 'ID',
    })
    id: string;

    @ApiProperty({
        description: 'Nome',
    })
    name: string;

    @ApiProperty({
        description: 'Data de nascimento (Formato: AAAA-MM-DD)',
    })
    birthdate: string;

    @ApiProperty({
        description: 'E-mail',
    })
    email: string;

    @ApiProperty({
        description: 'Telefone (Formato: +5551999999999 - E.164)',
    })
    phone_number: string;

    @ApiProperty({
        description: 'Cidade',
    })
    city: string;

    @ApiProperty({
        description: 'Estado',
    })
    state: string;

    @ApiProperty({
        description: 'País',
    })
    country: string;

    @ApiProperty({
        description: 'Endereço',
    })
    address: string;

    @ApiProperty({
        description: 'Complemento',
    })
    complement: string;

    @ApiProperty({
        description: 'Código postal (Formato: 99999-999)',
    })
    zip_code: string;

    @ApiProperty({
        description: 'Data da criação',
    })
    created_at: string;

    @ApiProperty({
        description: 'Data da última edição',
    })
    updated_at: string;
}
