/* istanbul ignore file */
import { IsUUID, IsOptional } from 'class-validator';

export class GetOrdersMessageDTO {
    @IsUUID()
    @IsOptional()
    orderId?: string;
}
