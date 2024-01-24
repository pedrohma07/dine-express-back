import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    this.userRepository.save(createUserDto);
  }

  async findAll() {
    const users = await this.userRepository.find();
    users.map((user) => {
      delete user.password;
    });
    if (!users) {
      return 'Nenhum usuário encontrado';
    }
    return {
      users,
      total: users.length,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return 'Nenhum usuário encontrado';
    }

    return {
      ...user,
      password: undefined,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return 'Usuário não encontrado';
    }

    const data = {
      ...user,
      ...updateUserDto,
    };

    await this.userRepository.update(id, data);

    return 'Usuário atualizado com sucesso';
  }

  remove(id: string) {
    const user = this.userRepository.findOne({ where: { id } });

    if (!user) {
      return 'Usuário não encontrado';
    }

    this.userRepository.delete(id);

    return 'Usuário removido com sucesso';
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
