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
class UpdatedUserUseCase {
  async execute(
    id: string,
    user: Omit<UserModel, "id">
  ): Promise<MessageResponseSuccess | MessageResponseError> {
    const userExist = await repositoryUserPrisma.findById(id);
    if (!userExist) {
      return { body: "Error: cliente naõ existe.", status: 400 };
    }

    const userBD = await repositoryUserPrisma.updateUser(id, user);
    return { body: userBD, status: 200 };
  }
}

export default new UpdatedUserUseCase();
