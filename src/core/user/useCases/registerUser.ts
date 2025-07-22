import repositoryUserPrisma from "../../../repositories/prismaRepository/repositoryUserPrisma";
import { UserModel } from "../entity/User";

type MessageResponseSuccess = {
  body: UserModel;
  status: number;
};

type MessageResponseError = {
  body: string;
  status: number;
};

class RegisterUserUseCase {
  async execute(
    user: Omit<UserModel, "id">
  ): Promise<MessageResponseSuccess | MessageResponseError> {
    let userExist = await repositoryUserPrisma.findByCpf(user.cpf);
    if (userExist !== null) {
      return { body: "Cliente já existe no banco", status: 400 };
    }

    const userBD = await repositoryUserPrisma.registerUser(user);
    return { body: userBD, status: 201 };
  }
}

export default new RegisterUserUseCase();
