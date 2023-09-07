import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  console.log('asdas');
  await app.listen(3002);
}
bootstrap();
