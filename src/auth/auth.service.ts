import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findAllRegister() {
  return this.prisma.user.findMany();
}
  
async register(
  username: string,
  password: string,
  role: UserRole,
  studentId: number,
) {
  // cek apakah username sudah ada
  const existingUser = await this.prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    throw new Error('Username sudah digunakan');
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // simpan user
  const newUser = await this.prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
      studentId: studentId, // pastikan ini sama dengan schema kamu
    },
  });

  return {
    message: 'Register berhasil',
    user: {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
    },
  };
}

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { student: true }, // optional
    });

    if (!user) {
      throw new UnauthorizedException('Username tidak ditemukan');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      studentId: user.studentId,
    };

    return {
      message: 'Login berhasil',
      access_token: this.jwtService.sign(payload),
    };
  }
}

