/* istanbul ignore file */
import { IsUUID, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductDTO } from '../update-product.dto';

export class UpdateProductMessageDTO {
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UpdateProductDTO)
    body: UpdateProductDTO;
}
