/* istanbul ignore file */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 128, nullable: false })
    name: string;

    @Column({ length: 2048, nullable: false })
    description: string;

    @Column({ length: 128, nullable: false })
    sku: string;

    @Column({ type: 'decimal', nullable: false })
    unit_price: number;

    @Column({ type: 'decimal', nullable: false })
    quantity_available: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @DeleteDateColumn()
    deleted_at: string;
}
