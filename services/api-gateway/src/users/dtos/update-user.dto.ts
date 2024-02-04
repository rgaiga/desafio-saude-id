/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Nome',
        required: false,
    })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Data de nascimento (Formato: AAAA-MM-DD)',
        required: false,
    })
    birthdate?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'E-mail',
        required: false,
    })
    email?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Telefone (Formato: +5551999999999 - E.164)',
        required: false,
    })
    phone_number?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Cidade',
        required: false,
    })
    city?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Estado',
        required: false,
    })
    state?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'País',
        required: false,
    })
    country?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Endereço',
        required: false,
    })
    address?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Complemento',
        required: false,
    })
    complement?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Código postal (Formato: 99999-999)',
        required: false,
    })
    zip_code?: string;
}
