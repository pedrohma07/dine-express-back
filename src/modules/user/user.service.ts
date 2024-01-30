import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../address/entities/address.entity';
import { isUuid } from 'src/utils/IsUUID';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);

      delete user.password;
      await this.userRepository.save(user);

      return {
        user,
        message: 'Usuario cadastrado com sucesso',
        StatusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
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
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      isUuid(id);

      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new HttpException(
          'Usuario não encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }

      delete user.password;

      return { user, statusCode: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      isUuid(id);

      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new HttpException(
          'Usuario não encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = {
        ...user,
        ...updateUserDto,
      };

      await this.userRepository.update(id, data);

      return {
        message: 'Usuario atualizado com sucesso',
        StatusCode: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      isUuid(id);

      const user = this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new HttpException(
          'Usuario não encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.userRepository.delete(id);

      return {
        message: 'Usuario removido com sucesso',
        statusCode: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
