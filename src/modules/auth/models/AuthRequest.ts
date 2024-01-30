import { Request } from 'express';
import { Client } from 'src/modules/client/entities/client.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

export interface AuthRequest extends Request {
  user: Client | Restaurant;
}
