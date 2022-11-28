import { 
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
 } from 'typeorm';

 import { Invoice } from './Invoice';

@Entity('charge_items')
export class ItemsCharge {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    charge_id: string;

    @Column()
    invoice_id: string;

    @OneToOne(() => Invoice, (invoice) => invoice.id)
    @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id'})
    invoice: Invoice;

}