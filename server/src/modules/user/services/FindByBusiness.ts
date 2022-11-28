import { dataSource } from '../../../shared/databases/connection';
import { User } from '../entities/User';

interface IRequest {
    business_code: string;
    current_user: string;
}

export class FindByBusiness {

    public async run({ business_code, current_user }: IRequest): Promise<User[]> {
        const userRepo = (await dataSource).getRepository(User);

        const users = await userRepo.find({
            where: [
                { business_code }
            ],
        });

        return users;
    }
}