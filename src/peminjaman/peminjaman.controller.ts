import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatepeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatepeminjamanDto } from './dto/update-peminjaman.dto';
import { param } from 'jquery';
import { title } from 'process';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('peminjaman')


export class StudentsController {
  constructor(
    private readonly peminjamanService: PeminjamanService,
  ) {}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Post()
  create(@Body() dto: CreatepeminjamanDto) {
    return this.peminjamanService.create(dto);
  }

  @Get()
  findAll() {
    return this.peminjamanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peminjamanService.findOne(Number(id));
  }

  @Get('title/:title')
  findMany(@Param('title') title: string){
    return this.peminjamanService.findByTitle(title)
  }

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatepeminjamanDto,
  ) {
    return this.peminjamanService.update(Number(id), dto);
  }
}
