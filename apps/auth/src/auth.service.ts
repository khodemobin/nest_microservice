import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UserRepository } from './users/users.repository';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from './users/models/user.schema';
import { LoginResponseType } from './types/login-response.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(loginDto: LoginDto, res: Response): Promise<LoginResponseType> {
    const user: UserDocument = await this.validateLoginData(loginDto);

    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires: Date = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.config.get('JWT_EXPIRATION'),
    );

    const token: string = this.jwtService.sign(tokenPayload);

    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return {
      _id: user._id.toString(),
      email: user.email,
      token: token,
    };
  }

  private async validateLoginData(loginDto: LoginDto): Promise<UserDocument> {
    const user: UserDocument = await this.userRepository.findOne({
      email: loginDto.email,
    });
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
