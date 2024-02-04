/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome',
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Data de nascimento (Formato: AAAA-MM-DD)',
    })
    birthdate: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'E-mail',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Telefone (Formato: +5551999999999 - E.164)',
    })
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Cidade',
    })
    city: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Estado',
    })
    state: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'País',
    })
    country: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Endereço',
    })
    address: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Complemento',
        required: false,
    })
    complement?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Código postal (Formato: 99999-999)',
    })
    zip_code: string;
}
