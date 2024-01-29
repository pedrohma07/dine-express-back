import { Request } from 'express';
import { Client } from 'src/app/modules/client/entities/client.entity';
import { User } from 'src/app/modules/user/entities/user.entity';

export interface AuthRequest extends Request {
  user: Client | User;
}
