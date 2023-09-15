import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';
import { LoginResponseType } from './types/login-response.type';
import { ValidateUserAction } from './actions/validate-user.action';
import { CreateTokenAction } from './actions/create-token.action';
import { RegisterDto } from './dto/register.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async login(loginDto: LoginDto, res: Response): Promise<LoginResponseType> {
    const user = await new ValidateUserAction(this.userRepository).run(
      loginDto,
    );

    const { token, expires } = new CreateTokenAction(
      this.config,
      this.jwtService,
    ).run(user);

    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return {
      id: user._id.toHexString(),
      email: user.email,
      token: token,
    };
  }

  async preRegister(registerDto: RegisterDto) {
    await this.cache.set('test', registerDto.email ?? registerDto.phone);
  }
}
