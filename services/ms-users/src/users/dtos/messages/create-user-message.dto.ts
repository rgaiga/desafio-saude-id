/* istanbul ignore file */
import { IsObject, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDTO } from '../create-user.dto';

export class CreateUserMessageDTO {
    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateUserDTO)
    body: CreateUserDTO;
}
