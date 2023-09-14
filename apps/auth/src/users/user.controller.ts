import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '@app/common/decorators';
import { UserDocument } from '@app/common/models/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<UserDocument> {
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument): Promise<UserDocument> {
    return user;
  }
}
