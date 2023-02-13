/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrderDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Status',
        required: false,
    })
    status?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Observação',
        required: false,
    })
    observation?: string;
}
