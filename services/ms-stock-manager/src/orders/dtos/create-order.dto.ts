/* istanbul ignore file */
import {
    IsUUID,
    IsNotEmpty,
    IsArray,
    ArrayNotEmpty,
    ValidateNested,
    IsNumber,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDTO {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    user_id: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested()
    @Type(() => Order)
    products: Order[];

    @IsNumber()
    @IsNotEmpty()
    total_quantity: number;

    @IsNumber()
    @IsNotEmpty()
    total_price: number;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    observation: string;

    @IsString()
    @IsNotEmpty()
    created_at: string;

    @IsString()
    @IsNotEmpty()
    updated_at: string;
}

class Order {
    @IsUUID()
    @IsNotEmpty()
    product_id: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    unit_price: number;
}
