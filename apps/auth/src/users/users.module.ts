import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserDocument, UserSchema } from '@app/common/models/user.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    LoggerModule,
  ],
  controllers: [UserController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
