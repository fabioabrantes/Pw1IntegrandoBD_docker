import { Request, Response } from "express";
import AuthenticateUC from "../core/authenticate/useCases/aunthenticateUseCase";

class AuthenticateController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    // validar os dados

    res.status(result.status).json(result.body);
  }
}

export default new AuthenticateController();
