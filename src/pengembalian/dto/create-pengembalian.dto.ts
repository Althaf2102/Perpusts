import { IsNotEmpty, IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreatepengembalianDto {
 @IsOptional()
  @IsNumber()
  peminjamanId: number;

  @IsOptional()
  @IsNumber()
  studentId: number;

  @IsOptional()
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