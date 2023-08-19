import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsDate()
  @Type(() => Date)
  startDate: Date;
  @IsDate()
  @Type(() => Date)
  endDate: Date;
  @IsString()
  @IsNotEmpty()
  placeId: string;
  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
