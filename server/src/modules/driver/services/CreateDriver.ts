import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Driver } from '../entities/Driver';
import { DriverToBusiness } from '../entities/DriverToBusiness';

interface IDriver {
    num_doc: string;
    validy_doc: string;
    name: string;
    attachment?: string
    status: boolean,
    business: string
}

export class CreateDriver {

    public async run({
        num_doc,
        validy_doc,
        name,
        status,
        attachment,
        business
    }: IDriver): Promise<Driver> {

        let driver: Driver | null;
        const driverRepo = (await dataSource).getRepository(Driver);
        const dToBRepo = (await dataSource) .getRepository(DriverToBusiness);

        driver = await driverRepo.findOneBy({ 
            num_doc
        });

        if(!driver) {            
           
            try {    
            
                driver = driverRepo.create({
                    num_doc,
                    validy_doc,
                    name,
                    status,
                    attachment
                });
                
                await driverRepo.save(driver);
            } catch (err) {
                throw new AppErrors('Erro ao cadastras motoristas', 401);
            }
        }

        const driverToBusinessExists = await dToBRepo.findOneBy({
            driver_id: num_doc,
            business_code: business
        })

        if(driverToBusinessExists) {
            throw new AppErrors('Motorista já cadastro', 401);
        }

        try {            

            const driveToBusness = dToBRepo.create({
               driver_id: num_doc,
               business_code: business
            });

            await dToBRepo.save(driveToBusness);

            return driver
        } catch (err) {
            throw new AppErrors('Erro ao cadastras motoristas, tente novamente', 401);
        }
    }
}