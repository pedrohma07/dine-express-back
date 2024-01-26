import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = this.clientRepository.create(createClientDto);
    await this.clientRepository.save(client);

    return createClientDto;
  }

  async findAll() {
    const clients = await this.clientRepository.find();

    if (!clients || clients.length === 0) {
      return 'Nenhum cliente encontrado';
    }

    return {
      total: clients.length,
      data: clients,
    };
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      return 'Cliente não encontrado';
    }

    delete client.password;

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      return 'Cliente não encontrado';
    }

    await this.clientRepository.update(id, updateClientDto);
  }

  async remove(id: string) {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException(`Client ID ${id} not found`);
    } else {
      return await this.clientRepository.remove(client);
    }
  }
}
