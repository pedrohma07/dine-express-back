import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { User } from '../user/entities/user.entity';
import { Client } from '../client/entities/client.entity';
import { ClientService } from '../client/client.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, User, Client])],
  controllers: [RestaurantController],
  providers: [RestaurantService, ClientService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
