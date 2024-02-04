/* istanbul ignore file */
import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(userId: string) {
        super(`Não foi possível encontrar um usuário com o ID "${userId}".`);
    }
}
