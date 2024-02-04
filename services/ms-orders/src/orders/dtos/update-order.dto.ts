/* istanbul ignore file */
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrderDTO {
    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    observation?: string;
}
