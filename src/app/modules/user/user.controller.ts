import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    const userExist = await this.findByEmail(createUserDto.email);

    if (userExist) {
      return 'Email já cadastrado';
    }
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 12),
    };

    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get()
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
}
