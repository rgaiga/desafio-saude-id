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
    OneToMany,
} from 'typeorm';

import { UserEntity } from '@users/entities/user.entity';
import { OrderProductEntity } from '@orders/entities/order-product.entity';

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column()
    user_id: string;

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
    products: OrderProductEntity[];

    @Column({ type: 'decimal', nullable: false })
    total_quantity: number;

    @Column({ type: 'decimal', nullable: false })
    total_price: number;

    @Column({ length: 128, nullable: false })
    status: string;

    @Column({ length: 128, nullable: true })
    observation: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @DeleteDateColumn()
    deleted_at: string;
}
