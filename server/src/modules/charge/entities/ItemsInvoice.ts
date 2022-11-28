import { 
    Column,
    Entity,
    PrimaryGeneratedColumn
 } from 'typeorm';

@Entity('invoice_items')
export class ItemsInvoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    invoice_id: string;

    @Column()
    description: string;

    @Column('numeric')
    value: number;

    @Column('numeric')
    gross_weight: number;

    @Column()
    net_weight: string;
}