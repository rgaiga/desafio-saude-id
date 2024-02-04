/* istanbul ignore file */
import { NotFoundException } from '@nestjs/common';

export class OrderNotFoundException extends NotFoundException {
    constructor(orderId: string) {
        super(`Não foi possível encontrar uma ordem com o ID "${orderId}".`);
    }
}
