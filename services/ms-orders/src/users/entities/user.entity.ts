/* istanbul ignore file */
import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ length: 128, nullable: false })
    name: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @DeleteDateColumn()
    deleted_at: string;
}
