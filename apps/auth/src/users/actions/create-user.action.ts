import { UserRepository } from '../users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

export class CreateUserAction {
  constructor(private readonly userRepository: UserRepository) {}

  async run(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (user) {
      return user;
    }

    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      emailVerifiedAt: undefined,
      family: '',
      name: '',
      phoneVerifiedAt: undefined,
    });
  }
}
