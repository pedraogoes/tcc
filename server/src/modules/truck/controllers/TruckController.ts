import { Request, Response } from "express";
import { AlterTruck } from "../services/AlterTruck";
import { CreateTruck } from '../services/CreateTruck';
import { DeleteTruck } from "../services/DeleteTruck";
import { FindAllTruck } from "../services/FindAllTruck";
import { FindTruckByPlate } from "../services/FindTruckByPlate";

const createTruck = new CreateTruck();
const findTruckByPlate = new FindTruckByPlate();
const findAllTruck = new FindAllTruck();
const alterTruck = new AlterTruck();
const deleteTruck = new DeleteTruck();

export class TruckController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;

        const { 
            plate,
            model,
            brand,
            type,
            weigth,
            capacity,
        } = req.body;

        const truck = await createTruck.run({
            plate,
            model,
            brand,
            type,
            weigth,
            capacity,
            business
        });

        return res.status(201).json(truck);
    }

    public async findByPlate(req: Request, res: Response): Promise<Response> {
        const { plate } = req.params;

        const truck = await findTruckByPlate.run(plate);

        return res.status(201).json(truck);
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        const trucks = await findAllTruck.run();

        return res.status(201).json(trucks);
    }

    public async alterTruck(req: Request, res: Response): Promise<Response> {
        const { 
            plate,
            model,
            brand,
            type,
            weigth,
            capacity,
            status
        } = req.body;

        await alterTruck.run({
            plate,
            model,
            brand,
            type,
            weigth,
            capacity,
            status: status ? true : false
        });

        return res.status(201).send();
    }

    public async deleteTruck(req: Request, res: Response): Promise<Response> {
        const { plate } = req.params;

        await deleteTruck.run(plate);

        return res.status(200).send();
    }
}