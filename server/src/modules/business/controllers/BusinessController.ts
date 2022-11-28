import { Request, Response } from 'express';
import { AlterBusiness } from '../services/AlterBusiness';
import { CreateBusiness } from '../services/CreateBusiness';
import { FindBusiness } from '../services/FindBusiness';

const createBusiness = new CreateBusiness();
const findBusiness = new FindBusiness();
const alterTruck = new AlterBusiness();

export class BusinessController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;
       
        const {
            code,
            name,
            type,
            certificate,
            cert_attachment
        } = req.body;

        const business = await createBusiness.run({
            code,
            name,
            type,
            certificate,
            cert_attachment,
            user_id: id
        });

        return res.status(201).json(business);
    }

    public async find(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;

        const resultBusiness = await findBusiness.run({ code: business });

        return res.status(200).json(resultBusiness);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;

        const {
            name,
            type,
            certificate,
            cert_attachment
        } = req.body;

        await alterTruck.run({
            code: business,
            name,
            type,
            certificate,
            cert_attachment
        });

        return res.status(200).send();
    }
}