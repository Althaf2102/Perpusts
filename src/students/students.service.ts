import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto, role: string) {
    if (role === 'PETUGAS') {
      throw new ForbiddenException('Petugas tidak bisa menambahkan student di fungsi create');
    }

    return this.prisma.student.create({
      data: {
        nis: dto.nis,
        name: dto.name,
        email: dto.email,
        kelas: dto.kelas,
        jurusan: dto.jurusan
      }
    });
  }

  async findAll() {
    return this.prisma.student.findMany({ orderBy: { id: 'desc' } });
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async findByNis(nis: string) {
    const student = await this.prisma.student.findUnique({ where: { nis } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async findByName(name: string) {
    const student = await this.prisma.student.findMany({ where: { name } });
    if (!student.length) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async update(id: number, dto: UpdateStudentDto) {
    await this.findOne(id);
    return this.prisma.student.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.student.delete({ where: { id } });
  }
}
