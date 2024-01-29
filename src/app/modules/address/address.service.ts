import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isUuid } from 'src/app/utils/IsUUID';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    try {
      const address = this.addressRepository.create(createAddressDto);

      await this.addressRepository.save(address);

      return {
        address,
        message: 'Endereço cadastrado com sucesso',
        statusCode: HttpStatus.CREATED,
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
      const addresses = await this.addressRepository.find();

      if (addresses.length === 0) {
        throw new HttpException(
          { message: 'Nenhum endereço encontrado' },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        total: addresses.length,
        data: addresses,
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
      if (!isUuid(id)) {
        throw new HttpException(
          { message: 'ID informado não é um UUID válido' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const address = await this.addressRepository.findOne({ where: { id } });

      if (!address) {
        throw new HttpException(
          { message: `Endereço referente ao ID: ${id} não encontrado` },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        address,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    try {
      if (!isUuid(id)) {
        throw new HttpException(
          { message: 'ID informado não é um UUID válido' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const address = await this.addressRepository.findOne({ where: { id } });

      if (!address) {
        throw new HttpException(
          { message: `Endereço referente ao ID: ${id} não encontrado` },
          HttpStatus.NOT_FOUND,
        );
      }
      if (Object.keys(updateAddressDto).length === 0) {
        throw new HttpException(
          { message: 'Informe os dados para atualização' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = {
        ...address,
        ...updateAddressDto,
      };

      this.addressRepository.update(id, data);

      return {
        message: 'Endereço atualizado com sucesso',
        statusCode: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      if (!isUuid(id)) {
        throw new HttpException(
          { message: 'ID informado não é um UUID válido' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const address = await this.addressRepository.findOne({ where: { id } });

      if (!address) {
        throw new HttpException(
          { message: `Endereço referente ao ID: ${id} não encontrado` },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.addressRepository.delete(id);

      return {
        message: 'Endereço removido com sucesso',
        statusCode: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
