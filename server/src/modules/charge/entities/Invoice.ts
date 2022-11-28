import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { Driver } from "../../driver/entities/Driver";
import { Truck } from "../../truck/entities/Truck";

@Entity('invoice')
export class Invoice {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nfe_number: string;

    @Column('numeric')
    nfe_gross_weight: number;

    @Column('numeric')
    nfe_net_weight: number;

    @Column('timestamp')
    need_date: Date;

    @Column()
    driver: string;

    @OneToMany(() => Driver, (driver) => driver.num_doc)
    @JoinColumn({ name: 'driver', referencedColumnName: 'num_doc' })
    driver_entitie: Driver;

    @Column()
    truck: string

    @OneToMany(() => Truck, (truck) => truck.plate)
    @JoinColumn({ name: 'truck', referencedColumnName: 'plate' })
    truck_entitie: Truck;

    @Column()
    freight_value: number;

    @Column()
    status: string;

    @Column()
    shipper: string;

    @Column()
    conveyor: string;

    @Column()
    boarding: string;

    @Column()
    boarding_detail: string;

    @Column()
    landing: string;

    @Column()
    landing_detail: string;

    @Column()
    nfe_attachment: string;

    @Column()
    charge: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}