import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Business } from '../entities/Business';

interface IBusiness {
    code: string;
}

export class FindBusiness {

    public async run({ code }: IBusiness): Promise<Business> {
        const businessRepo = (await dataSource).getRepository(Business);

        const business = await businessRepo.findOneBy({ code });

        if(!business) {
            throw new AppErrors('Nenhuma empresa encontrado', 401);
        }

        return business;
    }

}