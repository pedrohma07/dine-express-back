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
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import * as bcrypt from 'bcrypt';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('register')
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const restaurantExist = await this.restaurantService.findByEmail(
      createRestaurantDto.email,
    );

    if (restaurantExist) {
      throw new HttpException('Email já cadastrado', 400);
    }

    const data = {
      ...createRestaurantDto,
      password: await bcrypt.hash(createRestaurantDto.password, 12),
    };

    return this.restaurantService.create(data);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  async findByEmail(email: string) {
    return await this.restaurantService.findByEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}
