/* istanbul ignore file */
import { IsUUID, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDTO } from '../create-user.dto';

export class CreateUserMessageDTO {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateUserDTO)
    body: CreateUserDTO;
}
