/* istanbul ignore file */
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    name?: string;
}
