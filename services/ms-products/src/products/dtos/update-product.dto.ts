/* istanbul ignore file */
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDTO {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    sku?: string;

    @IsNumber()
    @IsOptional()
    unit_price?: number;

    @IsNumber()
    @IsOptional()
    quantity_available?: number;
}
