import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT || 1000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos que não estão no DTO
      forbidNonWhitelisted: true, // retorna um erro caso o usuário envie um campo que não existe
      transform: true, // transforma os dados em objetos
    }),
  );
  const url = (await app.getUrl()).replace('[::1]', 'localhost');
  console.log(`Application is running on: ${url}`);
}
bootstrap();
