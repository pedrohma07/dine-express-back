import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { User } from './app/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './app/auth/auth.module';
import { JwtAuthGuard } from './app/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pedro',
      password: 'senha-postgres',
      database: 'DineExpress',
      entities: [User],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }), // importando o módulo de configuração para usar variáveis de ambiente
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE, // importando o módulo de validação para usar nos controllers
      useClass: ValidationPipe, // usando a classe de validação
    },
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
