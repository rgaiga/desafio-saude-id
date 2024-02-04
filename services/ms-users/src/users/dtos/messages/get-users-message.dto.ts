/* istanbul ignore file */
import { IsUUID, IsOptional } from 'class-validator';

export class GetUsersMessageDTO {
    @IsUUID()
    @IsOptional()
    userId?: string;
}
