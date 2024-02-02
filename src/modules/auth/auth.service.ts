/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { Client } from '../client/entities/client.entity';
import { ClientService } from '../client/client.service';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientService,
    private readonly restaurantService: RestaurantService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: Client | Restaurant): UserToken {
    if ('cnpj' in user) {
      const payload: UserPayload = {
        sub: user.id,
        cnpj: user.cnpj,
        role: user.role,
        email: user.email,
      };
      const jwtToken = this.jwtService.sign(payload);

      return {
        access_token: jwtToken,
      };
    }

    // Se não for um Cliente, assume que é um Restaurante (Restaurant)
    const payload: UserPayload = {
      sub: user.id,
      cpf: user.cpf,
      role: user.role,
      email: user.email,
    };
    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const restaurant = await this.restaurantService.findByEmail(email);
    const client = await this.clientService.findByEmail(email);

    let isValidRestaurant = false;
    let isValidClient = false;

    if (restaurant)
      isValidRestaurant = await bcrypt.compare(password, restaurant.password);
    if (client) isValidClient = await bcrypt.compare(password, client.password);

    if (isValidRestaurant || isValidClient) {
      const authenticatedUser = isValidRestaurant
        ? { ...restaurant, password: undefined }
        : { ...client, password: undefined };
      return authenticatedUser;
    }

    throw new Error('Email address or password provided is incorrect.');
  }

  async validateToken(token: string) {
    try {
      const decoded = await this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
