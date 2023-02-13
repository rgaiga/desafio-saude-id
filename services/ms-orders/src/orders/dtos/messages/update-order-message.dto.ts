/* istanbul ignore file */
import { IsUUID, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateOrderDTO } from '../update-order.dto';

export class UpdateOrderMessageDTO {
    @IsUUID()
    @IsNotEmpty()
    orderId: string;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UpdateOrderDTO)
    body: UpdateOrderDTO;
}
