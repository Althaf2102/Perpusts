import { IsNotEmpty, IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreatepeminjamanDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsString()
  title: string;  // pastikan menggunakan 'string' bukan 'String'

  @IsNotEmpty()
  @IsString()
  lesson: string;

  @IsOptional()
  @IsString()
  status: string;
}