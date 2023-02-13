/* istanbul ignore file */
import { IsUUID, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUserDTO } from '../update-user.dto';

export class UpdateUserMessageDTO {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UpdateUserDTO)
    body: UpdateUserDTO;
}
