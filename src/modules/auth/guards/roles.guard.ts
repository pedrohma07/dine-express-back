import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { RolesClient, RolesRestaurant } from '../../../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const requiredRoles = this.reflector.getAllAndOverride(Roles.KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    return matchRoles(requiredRoles, user.role);
  }
}

function matchRoles(
  requiredRoles: RolesRestaurant | RolesClient,
  role: string,
): boolean | PromiseLike<boolean> {
  if (role === requiredRoles) {
    return true;
  } else {
    return false;
  }
}
