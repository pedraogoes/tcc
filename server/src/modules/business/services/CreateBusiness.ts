import { dataSource } from '../../../shared/databases/connection';
import { Business } from '../entities/Business';
import { User } from '../../user/entities/User';
import { AppErrors } from '../../../shared/errors/AppErrors';

interface IBusiness {
    code: string;
    name: string;
    type: string;
    certificate: string;
    cert_attachment: string;
    user_id: string;
}

export class CreateBusiness {

    public async run({
        code,
        name,
        type,
        certificate,
        cert_attachment,
        user_id
    }: IBusiness): Promise<Business> {
        
        const businessRepo = (await dataSource).getRepository(Business);
        const userRepo = (await dataSource).getRepository(User);

        const businessExist = await businessRepo.findOneBy({ code });

        if(businessExist) {
            throw new AppErrors('Empresa já possui cadastro', 401);
        }

        try {
            const business = businessRepo.create({
                code,
                name,
                type,
                certificate,
                cert_attachment
            });

            await businessRepo.save(business);

            await userRepo.update({ id: user_id} , { business_code: code });            

            return business;
        } catch (err) {
            throw new AppErrors('Erro ao cadastras empresa, tente novamente', 401);
        }
    }
}