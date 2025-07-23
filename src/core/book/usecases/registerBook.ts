import RepositoryBookPrisma from "../../../repositories/prismaRepository/repositoryBookPrisma";
import repositoryUserPrisma from "../../../repositories/prismaRepository/repositoryUserPrisma";

import { BookModel } from "../entity/Book";

type MessageResponseSuccess = {
  body: BookModel;
  status: number;
};

type MessageResponseError = {
  body: string;
  status: number;
};

class RegisterBookUseCase {
  async registrarlivro(){

  }
  async execute(
    book: Omit<BookModel, "id">
  ): Promise<MessageResponseSuccess | MessageResponseError> {
    const userExists = await repositoryUserPrisma.findById(book.userId);
    if (!userExists) {
      return {
        body: "User not found",
        status: 400,
      };
    }
    let bookExist = await RepositoryBookPrisma.findByTitle(book.title);
    if (bookExist) {
      return {
        body: "Book already exists",
        status: 400,
      };
    }
    const bookBD = await RepositoryBookPrisma.registerBook(book);
    return {
      body: bookBD,
      status: 201,
    };
  }
}

export default new RegisterBookUseCase();
