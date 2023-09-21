import { Cache } from 'cache-manager';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { random } from 'lodash';
import { getUserIdentifier } from '../helpers/user.helper';
import { UserRepository } from '../../users/users.repository';
import { UnprocessableEntityException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { UserDocument } from '@app/common/models/user.schema';

export class StorePreRegisterDataAction {
  constructor(
    private readonly cache: Cache,
    private readonly userRepository: UserRepository,
  ) {}

  async run(registerDto: RegisterDto): Promise<number> {
    const otpCode: number = random(10000, 99999);
    const identifier: string = getUserIdentifier(registerDto);
    await this.findUser(registerDto);

    await this.cache.set(
      `preRegister:${identifier}:${otpCode}`,
      {
        name: registerDto.name,
        family: registerDto.family,
        email: registerDto.email,
        phone: registerDto.phone,
        password: await bcrypt.hash(registerDto.password, 10),
      },
      600000, // 10 min
    );

    return otpCode;
  }

  private async findUser(registerDto: RegisterDto) {
    const query: FilterQuery<UserDocument> = {};

    if (registerDto.email) {
      query.$or = [{ username: registerDto.email }];
    }

    if (registerDto.phone) {
      if (!query.$or) query.$or = [];
      query.$or.push({ email: registerDto.phone });
    }

    try {
      await this.userRepository.findOne(query);
    } catch (err) {
      return;
    }

    throw new UnprocessableEntityException(['email or phone exists']);
  }
}
