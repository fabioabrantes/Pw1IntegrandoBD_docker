import repositoryUserPrisma from "../../../database/repositories/repositoryUserPrisma";
import { UserModel } from '../model/User';

type MessageResponseSuccess = {
  body: UserModel[] | [];
  status: number;
}
class LisAllUsersUseCase {

  async execute(): Promise<MessageResponseSuccess> {
  
    const users = await repositoryUserPrisma.findAll();
    return { body: users, status: 200 };
  }
}

export default new LisAllUsersUseCase();