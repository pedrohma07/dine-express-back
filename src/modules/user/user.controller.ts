import { Body, Param, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

export class UserControllerBase {
  constructor(private readonly userService: UserService) {}

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

  findAll() {
    return this.userService.findAll();
  }

  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
}

// Para desativar a controller, basta não estendê-la em outra classe.
@Controller()
export class UserController extends UserControllerBase {
  constructor(userService: UserService) {
    super(userService);
  }
}
