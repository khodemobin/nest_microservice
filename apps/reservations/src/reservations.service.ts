import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { UserDto } from '@app/common/dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationsRepo: ReservationsRepository) {}

  create(createReservationDto: CreateReservationDto, user: UserDto) {
    return this.reservationsRepo.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: user._id,
    });
  }

  findAll() {
    return this.reservationsRepo.find({});
  }

  findOne(_id: string) {
    return this.reservationsRepo.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
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
