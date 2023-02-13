/* istanbul ignore file */
import { IsUUID, IsNotEmpty } from 'class-validator';

export class DeleteUserMessageDTO {
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
