/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDTO {
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
        description: 'Descrição',
        required: false,
    })
    description?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'SKU',
        required: false,
    })
    sku?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'Preço unitário',
        required: false,
    })
    unit_price?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'Quantidade disponível',
        required: false,
    })
    quantity_available?: number;
}
