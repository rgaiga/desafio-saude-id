/* istanbul ignore file */
import { IsString, IsOptional } from 'class-validator';

export class UpdateProductDTO {
    @IsString()
    @IsOptional()
    name?: string;
}
