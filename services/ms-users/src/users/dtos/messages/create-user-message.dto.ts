/* istanbul ignore file */
import { IsObject, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateUserDTO } from '@users/dtos';

export class CreateUserMessageDTO {
    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateUserDTO)
    body: CreateUserDTO;
}
