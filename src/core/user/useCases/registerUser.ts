import repositoryUserPrisma from "../../../database/repositories/repositoryUserPrisma";
import { UserModel } from '../model/User';

import { AppErrosCustom } from "../../../errors/AppCustomError";

type MessageResponseSuccess = {
  body: UserModel;
  status: number;
}

type MessageResponseError = {
  body: string;
  status: number;
}

class RegisterUserUseCase {

  async execute(user: Omit<UserModel, 'id'>): Promise<MessageResponseSuccess | MessageResponseError> {

    let userExist = await repositoryUserPrisma.findByCpf(user.cpf);
    if (userExist !== null) {
      throw new AppErrosCustom("Cliente já existe no banco.", 400);
    }

    const userBD = await repositoryUserPrisma.registerUser(user);
    return { body: userBD, status: 201 };
  }
}

export default new RegisterUserUseCase();