/* istanbul ignore file */
import { IsObject, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDTO } from '../create-product.dto';

export class CreateProductMessageDTO {
    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateProductDTO)
    body: CreateProductDTO;
}
