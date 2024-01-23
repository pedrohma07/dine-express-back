import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const url = (await app.getUrl()).replace('[::1]', 'localhost');
  console.log(`Application is running on: ${url}`);
}
bootstrap();
