/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/app/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { Client } from '../client/entities/client.entity';
import { ClientService } from '../client/client.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: Client | User): UserToken {
    //transform user to jwt
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const client = await this.clientService.findByEmail(email);

    let isValidUser = false;
    let isValidClient = false;

    if (user) isValidUser = await bcrypt.compare(password, user.password);
    if (client) isValidClient = await bcrypt.compare(password, client.password);

    if (isValidUser || isValidClient) {
      const authenticatedUser = isValidUser
        ? { ...user, password: undefined }
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
