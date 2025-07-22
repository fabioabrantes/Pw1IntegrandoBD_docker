import repositoryUserPrisma from "../../../repositories/prismaRepository/repositoryUserPrisma";
import { UserModel } from "../entity/User";

type MessageResponseSuccess = {
  body: UserModel[] | [];
  status: number;
};

type MessageResponseError = {
  body: string;
  status: number;
};

class LisAllUsersUseCase {
  async execute(): Promise<MessageResponseSuccess | MessageResponseError> {
    const users = await repositoryUserPrisma.findAll();
    if (!users) {
      return {
        body: "Error: book já está cadastrado com esse título.",
        status: 400,
      };
    }
    return { body: users, status: 200 };
  }
}

export default new LisAllUsersUseCase();
