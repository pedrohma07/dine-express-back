import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../address/entities/address.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const address = this.addressRepository.create(createUserDto.address);

    await this.addressRepository.save(address);
    await this.userRepository.save(user);
  }

  async findAll() {
    const data = await this.userRepository.find({
      relations: ['address'],
    });
    data.map((user) => {
      delete user.password;
    });
    if (!data) {
      return 'Nenhum usuário encontrado';
    }
    return {
      data,
      total: data.length,
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
