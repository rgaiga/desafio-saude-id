/* istanbul ignore file */
import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
    constructor(productId: string) {
        super(`Não foi possível encontrar um produto com o ID "${productId}".`);
    }
}
