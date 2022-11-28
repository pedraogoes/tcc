import { 
    Column, 
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn
} from 'typeorm';

@Entity('driver')
export class Driver {
    @PrimaryColumn()
    num_doc: string;

    @Column()
    validy_doc: string;

    @Column()
    name: string;

    @Column()
    attachment: string;

    @Column('boolean')
    status: boolean;

    @CreateDateColumn()
    createTable: Date;

    @UpdateDateColumn()
    updated_at: Date;
}