import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '@app/common/models/user.schema';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUserByContent(ctx),
);

const getCurrentUserByContent = (ctx: ExecutionContext): UserDocument => {
  return ctx.switchToHttp().getRequest().user;
};
