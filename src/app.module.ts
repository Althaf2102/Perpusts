import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { PeminjamanModule } from './peminjaman/peminjaman.module';
import { PengembalianModule } from './pengembalian/pengembalian.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Membuat ConfigModule tersedia di seluruh aplikasi
      envFilePath:
      process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env',

    }),
    PrismaModule,
    StudentsModule,
    BookModule,
    PeminjamanModule,
    PengembalianModule,
    AuthModule,
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class AppModule {}
