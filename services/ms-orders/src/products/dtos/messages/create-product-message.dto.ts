/* istanbul ignore file */
import { IsUUID, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDTO } from '../create-product.dto';

export class CreateProductMessageDTO {
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateProductDTO)
    body: CreateProductDTO;
}
