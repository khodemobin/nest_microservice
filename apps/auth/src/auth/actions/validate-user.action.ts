import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../users/users.repository';
import { UserDocument } from '@app/common/models/user.schema';

export class ValidateUserAction {
  constructor(private readonly userRepository: UserRepository) {}

  async run(loginDto: LoginDto): Promise<UserDocument> {
    const user: UserDocument = await this.userRepository.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    const passwordValid: boolean = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
  }
}
