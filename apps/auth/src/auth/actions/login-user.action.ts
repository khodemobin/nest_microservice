import { UserDocument } from '@app/common/models/user.schema';
import { Response } from 'express';
import { CreateTokenAction } from './create-token.action';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export class LoginUserAction {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  run(user: UserDocument, res: Response) {
    const { token, expires } = new CreateTokenAction(
      this.config,
      this.jwtService,
    ).run(user);

    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }
}
