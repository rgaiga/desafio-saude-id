/* istanbul ignore file */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    birthdate: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsOptional()
    complement?: string;

    @IsString()
    @IsNotEmpty()
    zip_code: string;
}
