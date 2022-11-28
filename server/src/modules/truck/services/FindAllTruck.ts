import { dataSource } from "../../../shared/databases/connection";
import { Truck } from "../entities/Truck";

export class FindAllTruck {

    public async run(): Promise<Truck[]> {
        const truckRepo = (await dataSource).getRepository(Truck);

        const trucks = truckRepo.find();

        return trucks;
    }
}