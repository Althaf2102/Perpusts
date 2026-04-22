import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PengembalianService } from './pengembalian.service';
import { CreatepengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatepengembalianDto } from './dto/update-pengembalian.dto';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';





@ApiBearerAuth()
@Controller('pengembalian')

export class PengembalianController {
  constructor(
    private readonly pengembalianService: PengembalianService,
  ) {}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Post()
   @ApiOperation({ summary: 'Menambahkan buku (ADMIN dan petugas)' })
  create(@Body() dto: CreatepengembalianDto) {
    return this.pengembalianService.create(dto);
  }

  @Get()
  findAll() {
    return this.pengembalianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pengembalianService.findOne(Number(id));
  }

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatepengembalianDto,
  ) {
    return this.pengembalianService.update(Number(id), dto);
  }

  
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.PETUGAS)
    @Put('kembalikan/:id')
kembalikan(@Param('id') id: string) {
  return this.pengembalianService.kembalikan(Number(id));
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pengembalianService.remove(Number(id));
  }
}
