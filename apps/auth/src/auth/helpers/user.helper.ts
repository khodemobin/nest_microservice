import { RegisterDto } from '../dto/register.dto';
import { VerifyDto } from '../dto/verify.dto';

export function getUserIdentifier(dto: RegisterDto | VerifyDto): string {
  return dto.email ? dto.email : dto.phone;
}
