import { Request, Response } from 'express';
import { CreateCharge } from '../services/CreateCharge';
import { FindByChargeId } from '../services/FindByChargeId';
import { FindByBusiness } from '../services/FindByBusiness';
import { FindItemsByCharge } from '../services/FindItemsByCharge';
import { DeleteCharge } from '../services/DeleteCharge';

const createCharge = new CreateCharge();
const findByChargeId = new FindByChargeId();
const findByBusiness = new FindByBusiness();
const findItemsByCharge = new FindItemsByCharge();
const deleteCharge = new DeleteCharge();

export class ChargeController {    

    public async create(req: Request, res: Response): Promise<Response> {   
        const { business } = req.user;
        
        const {
            driver,
            truck,
            freight_value,
            items
        } = req.body;

        const charge = await createCharge.run({
            driver,
            truck,
            freight_value: Number(freight_value),
            business,
            items     
        });

        return res.status(201).json(charge);
    }

    public async findByChargeId(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;
        const { id } = req.params;

        const charge = await findByChargeId.run(Number(id), business);

        return res.status(201).json(charge);
    }

    public async findByBusiness(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;

        const charges = await findByBusiness.run(business);

        return res.status(201).json(charges);
    }

    public async findItemsByCharge(req: Request, res: Response): Promise<Response> {
        const { charge } = req.params;

        const items = await findItemsByCharge.run(charge);

        return res.status(201).json(items)
    }

    public async deleteCharge(req: Request, res: Response): Promise<Response> {
        const { charge } = req.params;

        await deleteCharge.run(charge);

        return res.status(201).send();
    }
}