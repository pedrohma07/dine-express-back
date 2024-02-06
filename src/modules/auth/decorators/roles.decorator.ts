import { Reflector } from '@nestjs/core';
import { RolesClient, RolesRestaurant } from 'src/enums/roles.enum';

export const Roles = Reflector.createDecorator<RolesRestaurant | RolesClient>();
