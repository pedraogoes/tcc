import { 
    Column, 
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn
} from 'typeorm';

@Entity('truck')
export class Truck {
    @PrimaryColumn()
    plate: string;

    @Column()
    model?: string;

    @Column()
    brand?: string;

    @Column()
    type?: string;

    @Column()
    weigth?: string;

    @Column()
    capacity?: string;

    @Column('boolean')
    status: boolean;

    @CreateDateColumn()
    createTable: Date;

    @UpdateDateColumn()
    updated_at: Date;
}