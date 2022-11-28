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
import { Business } from "../../business/entities/Business";

@Entity('charge')
export class Charge {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

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

    @Column('float')
    freight_value: number;

    @Column()
    status: string;

    @Column()
    business: string;

    @OneToMany(() => Business, (business) => business.code)
    @JoinColumn({ name: 'business', referencedColumnName: 'code' })
    business_entitie: Business;

    @Column()
    cte_number: string;

    @Column()
    cte_attachment: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}