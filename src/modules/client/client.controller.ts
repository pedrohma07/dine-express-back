import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as bcrypt from 'bcrypt';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesClient } from 'src/enums/roles.enum';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @IsPublic()
  @Post('register')
  async create(@Body() createClientDto: CreateClientDto) {
    const hashedPassword = await bcrypt.hash(createClientDto.password, 12);
    const client = { ...createClientDto, password: hashedPassword };

    return this.clientService.create(client);
  }

  @Get()
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientService.findOne(id);
  }

  @Put(':id')
  @Roles(RolesClient.CLIENT)
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @Roles(RolesClient.CLIENT)
  async remove(@Param('id') id: string) {
    return await this.clientService.remove(id);
  }
}
