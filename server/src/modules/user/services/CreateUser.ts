import { hash } from 'bcryptjs';
import { v4 } from 'uuid';
import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { User } from '../entities/User';

interface ICreateUser {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    type: string;
}

export class CreateUser {
    public async run({ name, email, password, password_confirmation, type }: ICreateUser): Promise<User> {
        const userRepo = (await dataSource).getRepository(User);

        const userExist = await userRepo.findOneBy({ email });

        if(userExist) {
            throw new AppErrors('Usuário já cadastrado', 401);
        }

        if(password !== password_confirmation)  {
            throw new AppErrors('Senhas não conferem', 401);
        }

        if(password.length < 6) {
            throw new AppErrors('Senha deve ter no mínimo de 6 caracteres', 401);
        }

        const password_hash = await hash(password, 12);
        const currentDate = new Date();

        try {
            const user = userRepo.create({ 
                name, 
                email, 
                password: password_hash,
                token: v4(),
                token_validity: currentDate.setHours(currentDate.getDay() + 1).toString(),
                business_code: '',
                type
            });

            await userRepo.save(user);

            return user;
        } catch(err) {
            throw new AppErrors('Error ao salvar usuário', 401);
        }
    }
}
