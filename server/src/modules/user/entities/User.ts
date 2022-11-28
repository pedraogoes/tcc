import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn ,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    business_code: string;

    @Column()
    token: string;

    @Column()
    token_validity: string;

    @Column()
    type: string;

    @CreateDateColumn()
    createTable: Date;

    @UpdateDateColumn()
    updated_at: Date;
}