import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { LoginResponseType } from './types/login-response.type';
import { CurrentUser } from '@app/common/decorators';
import { UserDocument } from '@app/common/models/user.schema';
import { UserResponseType } from './types/user-response.type';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response<LoginResponseType>,
  ) {
    const { user, token } = await this.authService.login(loginDto, res);
    res.send({
      user: {
        id: user._id.toHexString(),
        name: user.name,
        family: user.family,
        email: user.email,
        phone: user.phone,
      },
      token: token,
    });
  }

  @Post('register')
  async preRegister(@Body() registerDto: RegisterDto) {
    await this.authService.preRegister(registerDto);
  }

  @Post('verify')
  async verify(
    @Body() verifyDto: VerifyDto,
    @Res({ passthrough: true }) res: Response<LoginResponseType>,
  ) {
    const { user, token } = await this.authService.verify(verifyDto, res);
    res.send({
      user: {
        id: user._id.toHexString(),
        name: user.name,
        family: user.family,
        email: user.email,
        phone: user.phone,
      },
      token: token,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: UserDocument): Promise<UserResponseType> {
    return {
      id: user._id.toHexString(),
      name: user.name,
      family: user.family,
      email: user.email,
      phone: user.phone,
    };
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
