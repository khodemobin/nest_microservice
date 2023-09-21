import {
  Inject,
  Injectable,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';
import { ValidateUserAction } from './actions/validate-user.action';
import { RegisterDto } from './dto/register.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { StorePreRegisterDataAction } from './actions/store-pre-register-to-cache.action';
import { SendOtpAction } from './actions/send-otp.action';
import { VerifyDto } from './dto/verify.dto';
import { getUserIdentifier } from './helpers/user.helper';
import { UserDocument } from '@app/common/models/user.schema';
import { CacheUserType } from './types/cache-user.type';
import { LoginUserAction } from './actions/login-user.action';
import { NOTIFICATION_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationClient: ClientProxy,
  ) {}

  @Post()
  async login(loginDto: LoginDto, res: Response) {
    const user: UserDocument = await new ValidateUserAction(
      this.userRepository,
    ).run(loginDto);

    const token: string = new LoginUserAction(this.config, this.jwtService).run(
      user,
      res,
    );

    return {
      user,
      token,
    };
  }

  @Post()
  async preRegister(registerDto: RegisterDto) {
    const otpCode: number = await new StorePreRegisterDataAction(
      this.cache,
      this.userRepository,
    ).run(registerDto);
    await new SendOtpAction(this.notificationClient).run(otpCode);
  }

  async verify(verifyDto: VerifyDto, res: Response) {
    const identifier: string = getUserIdentifier(verifyDto);
    const cacheUser: CacheUserType = await this.cache.get(
      `preRegister:${identifier}:${verifyDto.code}`,
    );

    if (!cacheUser) {
      throw new UnprocessableEntityException('Invalid Info');
    }

    const user: UserDocument = await this.userRepository.create({
      avatar: null,
      phone: cacheUser.phone,
      email: cacheUser.email,
      emailVerifiedAt: verifyDto.email ? new Date() : null,
      family: cacheUser.family,
      name: cacheUser.name,
      password: cacheUser.password,
      phoneVerifiedAt: verifyDto.phone ? new Date() : null,
    });

    const token: string = new LoginUserAction(this.config, this.jwtService).run(
      user,
      res,
    );

    return {
      user,
      token,
    };
  }

  loginGoogle(user: UserDocument, res: Response) {
    const token: string = new LoginUserAction(this.config, this.jwtService).run(
      user,
      res,
    );

    return {
      user,
      token,
    };
  }
}
