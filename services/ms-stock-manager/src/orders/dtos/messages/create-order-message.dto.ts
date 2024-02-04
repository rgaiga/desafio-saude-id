/* istanbul ignore file */
import { IsUUID, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDTO } from '../create-order.dto';

export class CreateOrderMessageDTO {
    @IsUUID()
    @IsNotEmpty()
    orderId: string;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateOrderDTO)
    body: CreateOrderDTO;
}
