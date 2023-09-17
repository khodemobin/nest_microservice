import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { IsEmailOrPhoneConstraint } from './constraints/Is-email-or-phone.constraint';

export class VerifyDto {
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

  @Min(10000)
  @Max(99999)
  @IsNumber()
  code: string;
}
