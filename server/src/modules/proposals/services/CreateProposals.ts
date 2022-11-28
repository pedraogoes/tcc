import { dataSource } from '../../../shared/databases/connection';
import { Proposals } from "../entities/Proposals";
import { Charge } from '../../charge/entities/Charge';
import { AppErrors } from '../../../shared/errors/AppErrors';

interface IProposal {
    charge_id: string;
    conveyor: string;
    value: number;
    business: string;
}

export class CreateProposals {
    
    public async run({
        charge_id,
        conveyor,
        business,
        value
    }: IProposal): Promise<Proposals> {
        const proposalRepo = (await dataSource).getRepository(Proposals);
        const chargeRepo = (await dataSource).getRepository(Charge);

        const proposalExists = await proposalRepo.findOneBy({
            charge_id,
            conveyor
        });

        if(proposalExists) {
            throw new AppErrors('Já existe proposta cadastrada para essa carga', 401);
        }

        const charge = await chargeRepo.findOneBy({
            id: charge_id
        });

        if(!charge) {
            throw new AppErrors('Erro ao cadastrar proposta, tente novamente', 401);
        }

        try {
            const proposal = proposalRepo.create({
                charge_id,
                shipper: charge.shipper,
                conveyor,
                business,
                value,
                status: 'Aberta'
            });

            await proposalRepo.save(proposal);

            return proposal;
        } catch (err) {
            throw new AppErrors('Erro ao cadastrar proposta, tente novamente', 401);
        }        
    }
}