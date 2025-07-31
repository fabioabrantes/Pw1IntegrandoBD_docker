import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import repositoryUserPrisma from "../../../repositories/prismaRepository/repositoryUserPrisma";
import { AuthenticateModel } from "../entity/Authenticate";

type ParamsBody = {
  email: string;
  password: string;
};

type MessageResponse = {
  body: AuthenticateModel;
  status: number;
};

type MessageResponseError = {
  body: string;
  status: number;
};

class Authenticate {
  async execute({
    email,
    password,
  }: ParamsBody): Promise<MessageResponse | MessageResponseError> {
    ///validação verificando se o usario já está cadastrrado
    const userExist = await repositoryUserPrisma.findByEmail(email);
    if (!userExist) {
      return {
        body: "email or password not is register",
        status: 400,
      };
    }
    const passwordExist = await compare(password, userExist.password);
    if (!passwordExist) {
      return {
        body: "email or password not is register",
        status: 400,
      };
    }
    const token = sign({ sub: userExist.id }, process.env.TOKEN_KEY!, {
      expiresIn: "1d",
    });

    return { body: { token }, status: 200 };
  }
}

export default new Authenticate();
