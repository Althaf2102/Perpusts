import { Module } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { StudentsController } from './peminjaman.controller';

@Module({
  controllers: [StudentsController],
  providers: [PeminjamanService],
})
export class PeminjamanModule {}