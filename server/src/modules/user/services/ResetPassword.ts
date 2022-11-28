import { hash } from 'bcryptjs';
import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { User } from '../entities/User';

export class ResetPassword {

    public async run(password: string, password_confirmation: string, id: string): Promise<void> {

        if(password !== password_confirmation) {
            throw new AppErrors('Senhas não conferem', 401);
        }

        if(password.length > 5) {
            throw new AppErrors('Senha deve ter no mínimo de 6 caracteres', 401);
        }

        const userRepo = (await dataSource).getRepository(User);

        const user = await userRepo.findOneBy({ id });

        if(!user) {
            throw new AppErrors('Usuário não encontrado, tente novamente', 401);
        }

        try {
            const password_hash = await hash(password, 12);
            
            user.password = password_hash;
            
            await userRepo.save(user);
        } catch (error) {
            throw new AppErrors('Erro ao salvar nova senha, tente novamente', 401);   
        }

    }
}