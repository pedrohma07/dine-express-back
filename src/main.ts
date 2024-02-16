import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`api/${process.env.APP_URL_VERSION}`);

  const config = new DocumentBuilder()
    .setTitle('Documentação Swagger - DineExpress')
    .setDescription('Documentação da API do DineExpress')
    .setVersion(process.env.APP_VERSION)
    .addBearerAuth()
    .setBasePath(`/api/${process.env.APP_URL_VERSION}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos que não estão no DTO
      transform: true, // transforma os dados em objetos
    }),
  );

  await app.listen(process.env.APP_PORT || 1000);
  const url = (await app.getUrl()).replace('[::1]', 'localhost');
  console.log(
    `Application is running on: ${url}/api/${process.env.APP_URL_VERSION}`,
  );
}
bootstrap();
