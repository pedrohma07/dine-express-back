import { Module, forwardRef } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, User, Restaurant]),
    forwardRef(() => UserModule),
    forwardRef(() => RestaurantModule),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
