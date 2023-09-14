import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { UserDto } from '@app/common/dto';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepo: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) paymentService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto, user: UserDto) {
    return this.reservationsRepo.create({
      ...createReservationDto,
      userId: user._id,
      createdAt: undefined,
      updatedAt: undefined,
    });
  }

  async findAll() {
    return this.reservationsRepo.find({});
  }

  async findOne(_id: string) {
    return this.reservationsRepo.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepo.findOneAndUpdate(
      { _id },
      {
        $set: updateReservationDto,
      },
    );
  }

  remove(_id: string) {
    console.log(_id);

    return this.reservationsRepo.findOneAndDelete({ _id });
  }
}
