import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsEmailOrPhoneConstraint } from './constraints/Is-email-or-phone.constraint';

export class RegisterDto {
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

  @IsStrongPassword()
  password: string;
}
