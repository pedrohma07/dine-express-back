import { Request } from 'express';
import { Client } from 'src/app/client/entities/client.entity';
import { User } from 'src/app/user/entities/user.entity';

export interface AuthRequest extends Request {
  user: Client | User;
}
