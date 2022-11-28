import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Proposals } from "../entities/Proposals";

interface IFindByCharge {
    charge: string;
    business: string;
}

export class FindByCharge {
    
    public async run({ business, charge }: IFindByCharge): Promise<Proposals | Proposals[]> {
        const proposalRepo = (await dataSource).getRepository(Proposals);

        const proposal = await proposalRepo.findOneBy({
            charge_id: charge,
            business
        });

        if(!proposal) {
            throw new AppErrors('Nenhum proposta encontrada', 401);
        }

        if(business === proposal.shipper) {

            const proposals = await proposalRepo.findBy({
                charge_id: charge
            });

            return proposals;
        }

        return proposal;       
    }
}