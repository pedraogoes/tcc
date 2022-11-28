import { Request, Response } from "express";
import { AuthenticateUser } from "../services/AuthenticateUser";

const authenticateUser = new AuthenticateUser();

export class SessionController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
    
        const { user, token } = await authenticateUser.run({ email, password });

        return res.status(201).json({
            user,
            token
        });
    }
}