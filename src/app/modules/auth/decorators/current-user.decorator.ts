import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';
import { Client } from 'src/app/modules/client/entities/client.entity';
import { User } from 'src/app/modules/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Client | User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
