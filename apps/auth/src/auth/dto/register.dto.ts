import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';
import { IsOptional, IsString } from 'class-validator';

export class RegisterDto extends PartialType(LoginDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  family: string;
}
