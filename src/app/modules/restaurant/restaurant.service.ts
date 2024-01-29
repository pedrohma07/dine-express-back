import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Restaurant } from './entities/restaurant.entity';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private userService: UserService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);

    await this.restaurantRepository.save(restaurant);

    delete restaurant.password;

    return {
      message: 'Restaurante cadastrado com sucesso',
      data: restaurant,
      status: HttpStatus.CREATED,
    };
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
    const restaurant = await this.restaurantRepository.find({
      where: { email },
    });

    return restaurant;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
