/* istanbul ignore file */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsNumber()
    @IsNotEmpty()
    unit_price: number;

    @IsNumber()
    @IsNotEmpty()
    quantity_available: number;
}
