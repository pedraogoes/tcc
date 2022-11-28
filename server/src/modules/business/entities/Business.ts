import { 
    Column, 
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn
} from 'typeorm';

@Entity('business')
export class Business {
    @PrimaryColumn()
    code: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    certificate: string;

    @Column()
    cert_attachment: string;

    @CreateDateColumn()
    createTable: Date;

    @UpdateDateColumn()
    updated_at: Date;
}