/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome',
        required: false,
    })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Descrição',
        required: false,
    })
    description?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'SKU',
        required: false,
    })
    sku?: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Preço unitário',
        required: false,
    })
    unit_price?: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Quantidade disponível',
        required: false,
    })
    quantity_available?: number;
}
