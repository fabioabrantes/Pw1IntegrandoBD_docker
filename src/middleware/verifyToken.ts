import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  id: string;
  iat: number;
  exp: number;
  name: string;
}

export function verifyTokenAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // pegar o token dentro do cabeçalho da requisição e verificar se existe
  const header = request.headers.authorization;
  console.log(header);
  if (!header) {
    response.status(403).json({ message: "token missing" })
  }
  // retirar Bearer dfgdfgfhsivvbkvkjb que está com o token
  // [0] Bearer
  // [1] dfgdfgfhsivvbkvkjb 
  const [_, token] = header!.split(" ");
  // validar se é o token gerado é válido com a chave utilizada e pegar os payload
  try {
    const { id } = verify(token, process.env.TOKEN_KEY!) as IPayload;
    console.log(id);
    // alterar requisição
    request.userId = id;
    next();
  } catch (error) {
    response.status(403).json({ message: "token is not valid" })
  }

}