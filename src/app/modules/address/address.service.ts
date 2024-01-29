import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

      return { address, message: 'Endereço cadastrado com sucesso' };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const addresses = await this.addressRepository.find();

      return {
        total: addresses.length,
        data: addresses,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    try {
      const address = await this.addressRepository.findOne({ where: { id } });

      return address;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    try {
      const address = await this.addressRepository.findOne({ where: { id } });

      if (!address) {
        throw new HttpException(
          { message: `Endereço referente ao ID: ${id} não encontrado` },
          404,
        );
      }
      if (Object.keys(updateAddressDto).length === 0) {
        throw new HttpException(
          { message: 'Informe os dados para atualização' },
          400,
        );
      }

      const data = {
        ...address,
        ...updateAddressDto,
      };

      this.addressRepository.update(id, data);

      return 'Endereço atualizado com sucesso';
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      const address = await this.addressRepository.findOne({ where: { id } });

      if (!address) {
        throw new HttpException(
          { message: `Endereço referente ao ID: ${id} não encontrado` },
          404,
        );
      }

      await this.addressRepository.delete(id);

      return 'Endereço removido com sucesso';
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
