import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { CreateDriver } from '../services/CreateDriver';
import { DeleteDriver } from '../services/DeleteDriver';
import { FindAllDriver } from '../services/FindAllDriver';
import {ImageToBase64 } from '../services/ImageToBase64';

const createDriver = new CreateDriver();
const findAllDriver = new FindAllDriver();
const imageToBase64 = new ImageToBase64();
const deleteDriver = new DeleteDriver();

export class DriverController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;

        const updatededFile = req.files?.attachment as UploadedFile;

        const {
            num_doc,
            validy_doc,
            name
        } = req.body;

        const { file } = await imageToBase64.run(updatededFile);            
        
        const driver = await createDriver.run({
            num_doc,
            validy_doc,
            name,
            status: true,
            attachment: file,
            business
        });

        return res.status(201).json(driver) ;
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;

        const drivers = await findAllDriver.run(business);

        return res.status(201).json(drivers);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;

        const { driver } = req.params;

        await deleteDriver.run( driver, business );

        return res.status(200).send();
    }
}