import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
        return {
          message: 'Email já cadastrado',
          status: HttpStatus.BAD_REQUEST,
        };
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

  findAll() {
    return `This action returns all restaurant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  async findByEmail(email: string) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { email },
    });

    return restaurant;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
