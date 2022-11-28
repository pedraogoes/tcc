import { 
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('truck_to_business')
export class TruckToBusiness {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    truck_plate: string;

    @Column()
    business_code: string;
}