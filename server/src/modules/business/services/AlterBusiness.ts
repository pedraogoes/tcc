import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Business } from '../entities/Business';

interface IAlterBusiness {
    code: string;
    name: string;
    type: string;
    certificate: string;
    cert_attachment: string;
}

export class AlterBusiness {

    public async run({
        code,
        name,
        type,
        certificate,
        cert_attachment
    }: IAlterBusiness): Promise<void> {

        const businessRepo = (await dataSource).getRepository(Business);

        const business = await businessRepo.findOneBy({ code });

        if(!business) {
            throw new AppErrors('Empresa não encontrada', 401);
        }

        business.name = name;
        business.type = type;
        business.certificate = certificate;
        business.cert_attachment = cert_attachment;

        try {
            await businessRepo.save(business);            
        } catch (err) {
            throw new AppErrors('Erro ao atualizar empresa, tente novamente', 401);
        }
    }
}