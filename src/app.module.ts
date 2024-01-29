import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './app/modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './app/modules/auth/auth.module';
import { JwtAuthGuard } from './app/modules/auth/guards/jwt-auth.guard';
import { DatabaseModule } from './database/database.module';
import { AddressModule } from './app/modules/address/address.module';
import { ClientModule } from './app/modules/client/client.module';
import { RestaurantModule } from './app/modules/restaurant/restaurant.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }), // importando o módulo de configuração para usar variáveis de ambiente
    UserModule,
    AuthModule,
    DatabaseModule,
    AddressModule,
    ClientModule,
    RestaurantModule,
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
