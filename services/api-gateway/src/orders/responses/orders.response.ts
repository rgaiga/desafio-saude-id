/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';

class Product {
    @ApiProperty({
        description: 'ID do produto',
    })
    product_id: string;

    @ApiProperty({
        description: 'Quantidade',
    })
    quantity: number;

    @ApiProperty({
        description: 'Preço unitário',
    })
    unit_price: number;
}

export class OrderResponse {
    @ApiProperty({
        description: 'ID',
    })
    id: string;

    @ApiProperty({
        description: 'ID do usuário',
    })
    user_id: string;

    @ApiProperty({
        description: 'Lista de produtos',
        type: [Product],
    })
    products: Product[];

    @ApiProperty({
        description: 'Quantidade total',
    })
    total_quantity: number;

    @ApiProperty({
        description: 'Preço total',
    })
    total_price: number;

    @ApiProperty({
        description: 'Status',
    })
    status: string;

    @ApiProperty({
        description: 'Observação',
    })
    observation: string;

    @ApiProperty({
        description: 'Data da criação',
    })
    created_at: string;

    @ApiProperty({
        description: 'Data da última edição',
    })
    updated_at: string;
}
