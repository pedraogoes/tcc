import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from "../../../shared/errors/AppErrors";
import { User } from "../entities/User";

interface IAuth {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        id: string;
        name: string;
        email: string;
        type: string;
        business: string;
    },
    token: string;
}

export class AuthenticateUser {

    public async run({ email, password }: IAuth): Promise<IResponse> {
        const userRepo = (await dataSource).getRepository(User);

        const user = await userRepo.findOneBy({email});

        if(!user) {
            throw new AppErrors('Usuário ou senha inválido', 401);
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppErrors('Usuário ou senha inválido', 401);
        }

        const token = sign(
            {
                id: user.id
            },
            'b4e7304e870b9b8ea154b41e197bce0b',
            {
                subject: JSON.stringify({
                    user : user.id, 
                    business: user.business_code,
                    type: user.type
                }),
                expiresIn: '8h'
            }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.type,
                business: user.business_code,
            },
            token
        }
    }
}