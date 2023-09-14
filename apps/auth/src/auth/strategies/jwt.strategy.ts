import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request | any) => {
          const jwt =
            request?.cookies?.Authentication ||
            request?.Authentication ||
            request?.headers.authorization;

          return jwt ? jwt.substring(7, jwt.lenght) : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    return this.userService.getUser({ _id: userId });
  }
}
