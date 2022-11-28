import { hash } from 'bcryptjs';
import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { User } from '../entities/User';

export class ForgotPassword {
    public async run(token: string, password: string, password_confirmation: string): Promise<void> {
        const userRepo = (await dataSource).getRepository(User);

        const user = await userRepo.findOneBy({ token });

        if(!user) {
            throw new AppErrors('Nenhum token encontrado, solicite novamente', 401);
        }

        if(new Date(user.token_validity) > new Date()) {
            throw new AppErrors('Token inválido, solicite novamente.', 401);
        }

        if(password !== password_confirmation)  {
            throw new AppErrors('Senhas não conferem', 401);
        }

        try {
            const password_hash = await hash(password, 12);
            
            user.password = password_hash;
            
            await userRepo.save(user);
        } catch (error) {
            throw new AppErrors('Erro ao recuperar senha, tente novamente', 401);
        }
    }
}