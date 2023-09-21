import { ClientProxy } from '@nestjs/microservices';

export class SendOtpAction {
  constructor(private readonly notificationClient: ClientProxy) {}

  async run(otpCode: number) {
    this.notificationClient.emit('notify_email', { email: otpCode });
  }
}
