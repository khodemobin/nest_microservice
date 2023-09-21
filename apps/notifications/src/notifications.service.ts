import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  notifyEmail(data: NotifyEmailDto) {
    console.log('notification service received an email:', data.email);
  }
}
