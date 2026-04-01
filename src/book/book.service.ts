import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatebookDto } from './dto/create-book.dto';
import { UpdatebookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatebookDto) {
    return this.prisma.book.create({ data: dto });
  }

  async findAll() {
    return this.prisma.book.findMany({ orderBy: { id: 'desc' } });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async findByTitle(title: string) {
  const book = await this.prisma.book.findMany({
    where: { title },
  });

  if (!book) {
    throw new NotFoundException('Book Not Found');
  }

  return book;
}


  async update(id: number, dto: UpdatebookDto) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.book.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }
}