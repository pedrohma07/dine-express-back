import { Module, forwardRef } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { ClientModule } from '../client/client.module';
import { Client } from '../client/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, User, Client]),
    forwardRef(() => UserModule),
    forwardRef(() => ClientModule),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
