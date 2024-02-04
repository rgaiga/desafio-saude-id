/* istanbul ignore file */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 128, nullable: false })
    name: string;

    @Column({ length: 10, nullable: false })
    birthdate: string;

    @Column({ length: 128, nullable: false })
    email: string;

    @Column({ length: 15, nullable: false })
    phone_number: string;

    @Column({ length: 128, nullable: false })
    city: string;

    @Column({ length: 128, nullable: false })
    state: string;

    @Column({ length: 128, nullable: false })
    country: string;

    @Column({ length: 128, nullable: false })
    address: string;

    @Column({ length: 128, nullable: true })
    complement: string;

    @Column({ length: 9, nullable: false })
    zip_code: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @DeleteDateColumn()
    deleted_at: string;
}
