import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { isUuid } from 'src/utils/IsUUID';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const emailExists = await this.checkEmailExists(createClientDto.email);
      const cpfExists = await this.findByCpf(createClientDto.cpf);

      if (cpfExists) {
        throw new HttpException('CPF já cadastrado', HttpStatus.BAD_REQUEST);
      }

      if (emailExists) {
        throw new HttpException('Email em uso', HttpStatus.BAD_REQUEST);
      }

      const client = this.clientRepository.create(createClientDto);
      await this.clientRepository.save(client);

      delete client.password;

      return {
        client,
        message: 'Cliente cadastrado com sucesso',
        StatusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const clients = await this.clientRepository.find();

      if (!clients || clients.length === 0) {
        throw new HttpException({ message: 'Nenhum cliente encontrado' }, 404);
      }

      return {
        total: clients.length,
        data: clients,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      isUuid(id);

      const client = await this.clientRepository.findOne({ where: { id } });

      if (!client) {
        throw new HttpException(
          { message: 'Cliente não encontrado' },
          HttpStatus.NOT_FOUND,
        );
      }

      delete client.password;

      return {
        client,
        StatusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      isUuid(id);

      const client = await this.clientRepository.findOne({ where: { id } });

      if (!client) {
        throw new HttpException(
          { message: 'Cliente não encontrado' },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.clientRepository.update(id, updateClientDto);

      return {
        message: 'Cliente atualizado com sucesso',
        StatusCode: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      const client = await this.clientRepository.findOne({ where: { email } });

      return client;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByCpf(cpf: string) {
    try {
      const client = await this.clientRepository.findOne({ where: { cpf } });

      return client;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      isUuid(id);

      const client = await this.clientRepository.findOne({ where: { id } });

      if (!client) {
        throw new HttpException(
          { message: 'Cliente não encontrado' },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.clientRepository.remove(client);

      return {
        message: 'Cliente removido com sucesso',
        StatusCode: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const client = await this.findByEmail(email);

    const restaurant = await this.restaurantRepository.findOne({
      where: { email },
    });

    return client !== null || restaurant !== null;
  }
}
