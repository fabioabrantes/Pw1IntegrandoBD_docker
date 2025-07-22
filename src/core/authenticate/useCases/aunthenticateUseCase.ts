import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import repositoryUserPrisma from "../../../repositories/prismaRepository/repositoryUserPrisma";
import { UserModel } from "../../user/entity/User";
import { AuthenticateModel } from "../entity/Authenticate";

type ParamsBody = Omit<UserModel, "id" | "cpf" | "name">

type MessageResponse = {
  body: AuthenticateModel;
  status: number;
}

class Authenticate {


  async execute({ email, password }: ParamsBody): Promise<MessageResponse> {

    //validação dos campus email e passowrd

    ///validação verificando se o usario já está cadastrrado
  

    return { body: {token}, status: 200 };

  }
}

export default new Authenticate();