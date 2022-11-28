import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { User } from '../entities/User';

export class FindByUserId {
    public async run(id: string): Promise<User> {
        if(!id) {
            throw new AppErrors('Nenhum id informado', 401);
        }

        const userRepo = (await dataSource).getRepository(User);
        const user = await userRepo.findOneBy({ id });
        if(!user) {
            throw new AppErrors('Nenhum usuário não encontrada', 401);
        }

        return user
    }
}
