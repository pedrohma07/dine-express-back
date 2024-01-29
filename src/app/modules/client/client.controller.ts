import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { isUuid } from '../../utils/IsUUID';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly userService: UserService,
  ) {}

  @IsPublic()
  @Post('register')
  async create(@Body() createClientDto: CreateClientDto) {
    const userExist = await this.clientService.findByEmail(
      createClientDto.email,
    );

    if (userExist) {
      throw new HttpException('Email já cadastrado', 400);
    }

    const data = {
      ...createClientDto,
      password: await bcrypt.hash(createClientDto.password, 12),
    };

    return this.clientService.create(data);
  }

  @Get()
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const isUUID = isUuid(id);
    if (!isUUID) {
      return 'ID inválido';
    }
    return await this.clientService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const isUUID = isUuid(id);
    if (!isUUID) {
      return 'ID inválido';
    }

    return await this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isUUID = isUuid(id);

    if (!isUUID) {
      return 'ID inválido';
    }

    return await this.clientService.remove(id);
  }
}