import { TokenPayload } from '../interfaces/token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '@app/common/models/user.schema';

export class CreateTokenAction {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  run(user: UserDocument): {
    token: string;
    expires: Date;
  } {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires: Date = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.config.get('JWT_EXPIRATION'),
    );

    return {
      token: this.jwtService.sign(tokenPayload),
      expires,
    };
  }
}
