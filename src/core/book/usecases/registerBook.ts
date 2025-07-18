import RepositoryBookPrisma from "../../../database/repositories/repositoryBookPrisma";
import repositoryUserPrisma from "../../../database/repositories/repositoryUserPrisma";

import { BookModel } from '../model/Book';

type MessageResponseSuccess = {
  body: BookModel;
  status: number;
}

type MessageResponseError = {
  body: string;
  status: number;
}

class RegisterBookUseCase {

  async execute(book: Omit<BookModel, 'id'>): Promise<MessageResponseSuccess | MessageResponseError> {

    let userExist = await repositoryUserPrisma.findById(book.userId);
    if (userExist === null) {
      return { body: "Error: cliente não esta cadastrado.", status: 400 }
    }
 
    let bookExist = await RepositoryBookPrisma.findByTitle(book.title);
    if (bookExist !== null) {
      return { body: "Error: book já está cadastrado com esse título.", status: 400 }
    }
    const bookBD = await RepositoryBookPrisma.registerBook(book);
    return { body: bookBD, status: 201 };
  }
}

export default new RegisterBookUseCase();