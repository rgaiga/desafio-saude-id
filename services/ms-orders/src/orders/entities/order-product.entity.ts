/* istanbul ignore file */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { OrderEntity } from '@orders/entities/order.entity';
import { ProductEntity } from '@products/entities/product.entity';

@Entity('order_product')
export class OrderProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => OrderEntity, (order) => order.id)
    @JoinColumn({ name: 'order_id' })
    order: string;

    @Column()
    order_id: string;

    @ManyToOne(() => ProductEntity, (product) => product.id)
    @JoinColumn({ name: 'product_id' })
    product: string;

    @Column()
    product_id: string;

    @Column({ type: 'decimal', nullable: false })
    quantity: number;

    @Column({ type: 'decimal', nullable: false })
    unit_price: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @DeleteDateColumn()
    deleted_at: string;
}
