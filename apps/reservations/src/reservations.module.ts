import { Module } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { ReservationsController } from "./reservations.controller";
import { DatabaseModule, LoggerModule, PAYMENTS_SERVICE } from "@app/common";
import { ReservationsRepository } from "./reservations.repository";
import { ReservationDocument, ReservationSchema } from "./models/reservation.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AUTH_SERVICE } from "@app/common/constants/services";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
        MONGODB_USERNAME: Joi.string().required(),
        MONGODB_PASSWORD: Joi.string().required(),
        MONGODB_DB: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        PAYMENT_HOST: Joi.string().required(),
        PAYMENT_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('AUTH_HOST'),
            port: config.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService,
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get"PAYMENT_HOST"'),
            port: config.get"PAYMENT_PORT"',
          ,
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
