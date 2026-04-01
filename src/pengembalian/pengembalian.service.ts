import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatepengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatepengembalianDto } from './dto/update-pengembalian.dto';

@Injectable()
export class PengembalianService {
  kembalikanBuku: any;
  constructor(private prisma: PrismaService) {}

async kembalikan(peminjamanId: number) {
  // 1. Cek peminjaman ada dan statusnya masih DIPINJAM
  const peminjaman = await this.prisma.peminjaman.findFirst({
    where: {
      id: peminjamanId,
      status: 'DIPINJAM',
    },
  });

  if (!peminjaman) {
    throw new NotFoundException('Peminjaman tidak ditemukan atau sudah dikembalikan');
  }

  // 2. Update status di tabel PEMINJAMAN jadi DIKEMBALIKAN ← ini yang penting!
  await this.prisma.peminjaman.update({
    where: { id: peminjamanId },
    data: { status: 'DIKEMBALIKAN' },
  });

  // 3. Buat record di tabel pengembalian
  return this.prisma.pengembalian.create({
    data: {
      peminjamanId: peminjamanId,
      studentId: peminjaman.studentId,
      bookId: peminjaman.bookId,
      title: peminjaman.title,
      lesson: peminjaman.lesson,
      status: 'DIKEMBALIKAN',
    },
  });
}

  async create(dto: CreatepengembalianDto) {
 return this.prisma.pengembalian.create({ data: dto });

  }

  async findAll() {
    return this.prisma.pengembalian.findMany({ orderBy: { id: 'desc' } });
  }

  async findOne(id: number) {
    const pengembalian = await this.prisma.pengembalian.findUnique({ where: { id } });
    if (!pengembalian) throw new NotFoundException('Pengembalian not found');
    return pengembalian;
  }

 async findByPeminjaman(peminjamanId: number) {
  const data = await this.prisma.pengembalian.findMany({
    where: {
      peminjamanId: peminjamanId,
    },
  });

  return data;
}


  async update(id: number, dto: UpdatepengembalianDto) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.pengembalian.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.pengembalian.delete({ where: { id } });
  }
}