/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import {
    IsUUID,
    IsNotEmpty,
    IsArray,
    ArrayNotEmpty,
    ValidateNested,
    IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class Order {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID do produto',
    })
    product_id: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Quantidade',
    })
    quantity: number;
}

export class CreateOrderDTO {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID do usuário',
    })
    user_id: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested()
    @Type(() => Order)
    @ApiProperty({
        description: 'Lista de produtos',
        type: [Order],
    })
    products: Order[];
}
