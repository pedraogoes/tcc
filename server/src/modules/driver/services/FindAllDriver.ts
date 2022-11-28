import { dataSource } from '../../../shared/databases/connection';
import { Driver } from "../entities/Driver";
import { DriverToBusiness } from '../entities/DriverToBusiness';


export class FindAllDriver {

    public async run(business: string): Promise<Driver[]> {
        const drivers: Driver[] = [];
        const dToBRepo = (await dataSource) .getRepository(DriverToBusiness);

        const driversToBusiness = await dToBRepo.find({
            where: {
                business_code: business
            },
            relations: {
                driver: true
            }
        });

        driversToBusiness.map(driver => { 
            drivers.push(driver.driver)
        });

        return drivers
    }
}