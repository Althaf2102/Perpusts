import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatepeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatepeminjamanDto } from './dto/update-peminjaman.dto';

@Injectable()
export class PeminjamanService {
  constructor(private prisma: PrismaService) {}

 async create(dto: CreatepeminjamanDto) {
  const sedangDipinjam = await this.prisma.peminjaman.findFirst({
    where: {
      bookId: dto.bookId,
      status: 'DIPINJAM',  // cek di database
    },
  });

  if (sedangDipinjam) {
    throw new BadRequestException('Buku sedang dipinjam orang lain!');
  }

  return this.prisma.peminjaman.create({
    data: {
      ...dto,
      status: 'DIPINJAM',  // ← hardcode, tidak perlu dari DTO
    },
  });
}

  async findAll() {
    return this.prisma.peminjaman.findMany({ orderBy: { id: 'desc' } });
  }

  async findOne(id: number) {
    const peminjaman = await this.prisma.peminjaman.findUnique({ where: { id } });
    return peminjaman;
  }

  async findByTitle(title: string) {
  return this.prisma.peminjaman.findMany({
    where: {
      book: {
        title: title,
      },
    },
    include: {
      book: true,
    },
  });
}



  async update(id: number, dto: UpdatepeminjamanDto) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.peminjaman.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.peminjaman.delete({ where: { id } });
  }
}