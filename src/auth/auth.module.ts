import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // ← pastikan ini diimport
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,                    // ← masuk ke dalam array imports
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],       // ← jangan lupa controller
  providers: [AuthService, JwtStrategy, PrismaService],  // ← tambah PrismaService
  exports: [AuthService],

})
export class AuthModule {}