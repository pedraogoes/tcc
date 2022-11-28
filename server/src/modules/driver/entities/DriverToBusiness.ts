import { 
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Driver } from './Driver';

@Entity('driver_to_business')
export class DriverToBusiness {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    driver_id: string;

    @OneToOne(() => Driver)
    @JoinColumn({name: 'driver_id', referencedColumnName: 'num_doc' })
    driver: Driver

    @Column()
    business_code: string;
}