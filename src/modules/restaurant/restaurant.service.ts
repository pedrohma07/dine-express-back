import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUuid } from 'src/utils/IsUUID';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      const restaurant = this.restaurantRepository.create(createRestaurantDto);

      if (await this.findByEmail(restaurant.email)) {
        console.log(await this.findByEmail(restaurant.email));

        throw new HttpException(
          { message: 'Email já cadastrado' },
          HttpStatus.BAD_REQUEST,
        );
      }

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

    console.log(restaurant);

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
}
