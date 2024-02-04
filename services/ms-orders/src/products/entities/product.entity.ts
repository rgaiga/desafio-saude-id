/* istanbul ignore file */
import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';

import { OrderProductEntity } from '@orders/entities/order-product.entity';

@Entity('product')
export class ProductEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ length: 128, nullable: false })
    name: string;

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
    order_product: OrderProductEntity[];

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @DeleteDateColumn()
    deleted_at: string;
}
