import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../users/models/user.schema';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUserByContent(ctx),
);

const getCurrentUserByContent = (ctx: ExecutionContext): UserDocument => {
  return ctx.switchToHttp().getRequest().user;
};
