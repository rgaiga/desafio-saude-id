/* istanbul ignore file */
import { IsUUID, IsNotEmpty } from 'class-validator';

export class DeleteOrderMessageDTO {
    @IsUUID()
    @IsNotEmpty()
    orderId: string;
}
