import { Request, Response } from 'express';
import { CreateUser } from '../services/CreateUser';
import { CreateUserBusiness } from '../services/CreateUserBusiness';
import { FindByBusiness } from '../services/FindByBusiness';
import { FindByUserId } from '../services/FindByUserId';
import { ForgotPassword } from '../services/ForgotPassword';
import { ResetPassword } from '../services/ResetPassword';

const findByUserId = new FindByUserId();
const createUser = new CreateUser();
const forgotPassword = new ForgotPassword();
const resetPassword = new ResetPassword();
const findByBusiness = new FindByBusiness();
const createUserBusiness = new CreateUserBusiness();

export class UserController {

    public async findById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const user = await findByUserId.run(id as string);

        return res.status(201).json(user);
    }

    public async create(req: Request, res: Response): Promise<Response> {        
        const { 
            name,
            email,
            password,
            password_confirmation,
            type, 
        } = req.body;

        await createUser.run({
            name,
            email,
            password,
            password_confirmation,
            type
        });

        return res.status(201).send();
    }

    public async createUser(req: Request, res: Response): Promise<Response> {        
        const { 
            name,
            email,
            password,
            password_confirmation,
            business_code,      
        } = req.body;

        const user = await createUserBusiness.run({
            name,
            email,
            password,
            password_confirmation,
            business_code, 
        });

        return res.status(201).json({ user });
    }

    public async resetPassword(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;

        const { 
            password,
            password_confirmation
        } = req.body;

        await resetPassword.run(password, password_confirmation, id)

        return res.status(200).send();
    }

    public async forgotPassword(req: Request, res: Response): Promise<Response> {        
        const { token, password, password_confirmation } = req.body;

        await forgotPassword.run(token, password, password_confirmation);

        return res.status(200).send();
    }

    public async findByBusiness(req: Request, res: Response): Promise<Response> {
        const { id, business } = req.user;

        const users = await findByBusiness.run({
            business_code: business,
            current_user: id
        });

        return res.status(201).json(users);
    }
}