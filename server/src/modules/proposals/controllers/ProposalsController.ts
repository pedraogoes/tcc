import { Request, Response } from 'express';
import { CreateProposals } from '../services/CreateProposals';
import { FindByCharge } from '../services/FindByCharge';

const createProposal = new CreateProposals();
const findByCharge = new FindByCharge();

export class ProposalsController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;

        const { 
            charge_id,
            conveyor,
            value
        } = req.body;

        const proposal = await createProposal.run({
            charge_id,
            conveyor,
            value,
            business
        })

        return res.status(201).json(proposal);
    }

    public async findByCharge(req: Request, res: Response): Promise<Response> {
        const { business } =  req.user;
        const { charge } = req.params;

        const proposal = await findByCharge.run({ business, charge });

        return res.status(201).json(proposal);
    }
}