/* istanbul ignore file */
import { IsUUID, IsNotEmpty } from 'class-validator';

export class DeleteProductMessageDTO {
    @IsUUID()
    @IsNotEmpty()
    productId: string;
}
