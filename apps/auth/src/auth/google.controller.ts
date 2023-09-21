import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginResponseType } from './types/login-response.type';

@Controller('auth/google')
export class GoogleController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Req() req,
    @Res({ passthrough: true }) res: Response<LoginResponseType>,
  ) {
    if (!req.user) {
      return 'No user from google';
    }

    const { user, token } = this.authService.loginGoogle(req.user, res);
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
}
