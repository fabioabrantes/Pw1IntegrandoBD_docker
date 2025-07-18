import { PrismaClient } from '@prisma/client';

import { BookModel } from '../../core/book/model/Book';

class BookRepositoryPrisma {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async registerBook(book: Omit<BookModel, 'id'>) {
    return await this.prisma.book.create({
      data: {
        author: book.author,
        title: book.title,
        descriptionType: book.descriptionType,
        userId: book.userId
      }
    });
  }
  async findByTitle(title: string) {
    return await this.prisma.book.findFirst({
      where: {
        title
      }
    });
  }

  async getAllBooks(): Promise<BookModel[]> {
    return await this.prisma.book.findMany();
  }

}

export default new BookRepositoryPrisma();