import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';
import { Client } from 'src/app/modules/client/entities/client.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Client | Restaurant => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
