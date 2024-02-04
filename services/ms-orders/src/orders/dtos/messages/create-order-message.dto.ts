/* istanbul ignore file */
import { IsObject, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDTO } from '../create-order.dto';

export class CreateOrderMessageDTO {
    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateOrderDTO)
    body: CreateOrderDTO;
}
