import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import * as bcrypt from 'bcrypt';
import { IsPublic } from '../auth/decorators/is-public.decorator';
// import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesRestaurant } from 'src/enums/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('restaurant')
@ApiTags('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @IsPublic()
  @Post('register')
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const data = {
      ...createRestaurantDto,
      password: await bcrypt.hash(createRestaurantDto.password, 12),
    };

    return this.restaurantService.create(data);
  }

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(RolesRestaurant.ADMIN)
  @Roles(
    RolesRestaurant.ADMIN ||
      RolesRestaurant.MANEGER ||
      RolesRestaurant.ATTENDANT,
  )
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(RolesRestaurant.ADMIN)
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
  @ApiBearerAuth()
  @Roles(RolesRestaurant.ADMIN)
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}
