import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { CreateChargeDto } from '@app/common/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.config.get('STRIPE_KEY'), {
    apiVersion: '2023-08-16',
  });

  constructor(private readonly config: ConfigService) {}

  async createCharge(data: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: data.card,
    });

    return await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: data.amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
  }
}
