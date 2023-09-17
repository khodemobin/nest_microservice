export class SendOtpAction {
  async run(otpCode: number) {
    console.log('otp:', otpCode);
  }
}
