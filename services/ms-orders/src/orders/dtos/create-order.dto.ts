/* istanbul ignore file */
import {
    IsUUID,
    IsNotEmpty,
    IsArray,
    ArrayNotEmpty,
    ValidateNested,
    IsEmpty,
    IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDTO {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested()
    @Type(() => Order)
    products: Order[];

    @IsEmpty()
    total_quantity: number;

    @IsEmpty()
    total_price: number;

    @IsEmpty()
    status: string;

    @IsEmpty()
    observation: string;
}

class Order {
    @IsUUID()
    @IsNotEmpty()
    product_id: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsEmpty()
    unit_price: number;
}
