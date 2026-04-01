 import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';


 export class UpdatepengembalianDto{
 
  @IsOptional()
  @IsNumber()
  peminjamanId?: number;

  @IsOptional()
  @IsNumber()
  studentId?: number;

  @IsOptional()
  @IsNumber()
  bookId?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  lesson?: string;

  @IsOptional()
  @IsString()
  status?: string;

}