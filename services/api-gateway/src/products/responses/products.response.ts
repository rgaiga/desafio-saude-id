/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
    @ApiProperty({
        description: 'ID',
    })
    id: string;

    @ApiProperty({
        description: 'Nome',
    })
    name: string;

    @ApiProperty({
        description: 'Descrição',
    })
    description: string;

    @ApiProperty({
        description: 'SKU',
    })
    sku: string;

    @ApiProperty({
        description: 'Preço unitário',
    })
    unit_price: number;

    @ApiProperty({
        description: 'Quantidade disponível',
    })
    quantity_available: number;

    @ApiProperty({
        description: 'Data da criação',
    })
    created_at: string;

    @ApiProperty({
        description: 'Data da última edição',
    })
    updated_at: string;
}
