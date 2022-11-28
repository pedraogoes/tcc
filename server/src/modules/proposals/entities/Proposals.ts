import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Business } from '../../business/entities/Business';
import { Charge } from '../../charge/entities/Charge';

@Entity('proposals')
export class Proposals {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    charge_id: string;

    @ManyToMany(() => Charge, (charge) => charge.id)
    @JoinColumn({ name: 'charge_id', referencedColumnName: 'id' })
    charge_entitie: Charge;

    @Column()
    shipper: string;

    @Column()
    conveyor: string;

    @OneToMany(() => Business, (business) => business.code)
    @JoinColumn({ name: 'conveyor', referencedColumnName: 'code' })
    conveyor_entitie: Business;

    @Column('numeric')
    value: number;

    @Column()
    business: string;

    @OneToMany(() => Business, (business) => business.code)
    @JoinColumn({ name: 'business', referencedColumnName: 'code' })
    business_entitie: Business

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}