import repositoryUserPrisma from "../../../database/repositories/repositoryUserPrisma";
import { UserModel } from '../model/User';

type MessageResponseSuccess = {
  body: UserModel;
  status: number;
}
type MessageResponseError = {
  body: string;
  status: number;
}
class ListUserByIdUseCase {

  async execute(id: string): Promise<MessageResponseError | MessageResponseSuccess> {

    const userExist = await repositoryUserPrisma.findById(id);
    if (!userExist) {
      return { body: "Error: cliente naõ existe.", status: 400 }
    }

    return { body: userExist, status: 200 };
  }
}

export default new ListUserByIdUseCase();