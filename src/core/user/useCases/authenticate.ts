import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import repositoryUserPrisma from "../../../database/repositories/repositoryUserPrisma";
import { UserModel } from '../model/User';

type ParamsBody = {
  email: string;
  password: string;
}

type MessageResponse = {
  body: string;
  status: number;
}

class Authenticate {


  async execute({ email, password }: ParamsBody): Promise<MessageResponse> {

    //validação dos campus email e passowrd

    ///validação verificando se o usario já está cadastrrado
    const user = await repositoryUserPrisma.findByEmail(email);

    if (!user) {
      return { body: "Error: email ou password inválidos.", status: 400 }
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      return { body: "Error: email ou password inválidos.", status: 400 }
    }

    const token = sign(
      {
        id: user.id
      },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "1d"
      }
    );


    return { body: token, status: 200 };

  }
}

export default new Authenticate();