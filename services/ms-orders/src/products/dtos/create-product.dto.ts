/* istanbul ignore file */
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
}
