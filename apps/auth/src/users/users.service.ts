import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserAction } from './actions/create-user.action';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return new CreateUserAction(this.userRepository).run(createUserDto);
  }

  async getUser(getUserDto: GetUserDto) {
    return this.userRepository.findOne(getUserDto);
  }

  async findAll() {
    return this.userRepository.find({});
  }
}
