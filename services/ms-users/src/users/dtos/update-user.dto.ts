/* istanbul ignore file */
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    birthdate?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone_number?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    state?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    complement?: string;

    @IsString()
    @IsOptional()
    zip_code?: string;
}
