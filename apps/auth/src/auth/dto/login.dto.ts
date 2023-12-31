import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsEmailOrPhoneConstraint } from './constraints/Is-email-or-phone.constraint';

export class LoginDto {
  @IsEmail()
  @IsOptional()
  @Validate(IsEmailOrPhoneConstraint)
  email: string;

  @MinLength(11)
  @MaxLength(11)
  @IsNumberString()
  @IsOptional()
  @Validate(IsEmailOrPhoneConstraint)
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
