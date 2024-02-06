import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUuid } from 'src/utils/IsUUID';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      const emailExists = await this.checkEmailExists(
        createRestaurantDto.email,
      );
      const cnpjExists = await this.findByCnpj(createRestaurantDto.cnpj);

      if (cnpjExists) {
        throw new HttpException('CNPJ já cadastrado', HttpStatus.BAD_REQUEST);
      }

      if (emailExists) {
        throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
      }

      const restaurant = this.restaurantRepository.create(createRestaurantDto);

      await this.restaurantRepository.save(restaurant);
      delete restaurant.password;

      return {
        message: 'Restaurante cadastrado com sucesso',
        data: restaurant,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return { message: error.message, status: HttpStatus.BAD_REQUEST };
    }
  }

  async findAll() {
    try {
      const restaurants = await this.restaurantRepository.find();

      if (restaurants.length === 0) {
        return {
          message: 'Nenhum restaurante encontrado',
          status: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: 'Lista de restaurantes',
        data: restaurants,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return { message: error.message, status: HttpStatus.BAD_REQUEST };
    }
  }

  async findOne(id: string) {
    try {
      isUuid(id);
      const restaurant = await this.restaurantRepository.findOne({
        where: { id },
      });

      if (!restaurant) {
        return {
          message: 'Restaurante não encontrado',
          status: HttpStatus.NOT_FOUND,
        };
      }

      return {
        data: restaurant,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return { message: error.message, status: HttpStatus.BAD_REQUEST };
    }
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    try {
      isUuid(id);
      const restaurant = await this.restaurantRepository.findOne({
        where: { id },
      });

      if (!restaurant) {
        return {
          message: 'Restaurante não encontrado',
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.restaurantRepository.update(id, updateRestaurantDto);

      return {
        message: 'Restaurante atualizado com sucesso',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return { message: error.message, status: HttpStatus.BAD_REQUEST };
    }
  }

  async findByEmail(email: string) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { email },
    });

    return restaurant;
  }

  async findByCnpj(cnpj: string) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { cnpj },
    });

    return restaurant;
  }

  async remove(id: string) {
    try {
      isUuid(id);
      const restaurant = await this.restaurantRepository.findOne({
        where: { id },
      });

      if (!restaurant) {
        return {
          message: 'Restaurante não encontrado',
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.restaurantRepository.delete(id);

      return {
        message: 'Restaurante removido com sucesso',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      return { message: error.message, status: HttpStatus.BAD_REQUEST };
    }
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const client = await this.clientRepository.findOne({ where: { email } });

    const restaurant = await this.findByEmail(email);

    return client !== null || restaurant !== null;
  }
}
