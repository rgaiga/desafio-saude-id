/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome',
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Descrição',
    })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'SKU',
    })
    sku: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Preço unitário',
    })
    unit_price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Quantidade disponível',
    })
    quantity_available: number;
}
