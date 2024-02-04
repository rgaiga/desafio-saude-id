/* istanbul ignore file */
import { IsUUID, IsOptional } from 'class-validator';

export class GetProductsMessageDTO {
    @IsUUID()
    @IsOptional()
    productId?: string;
}
