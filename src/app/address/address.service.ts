import { Injectable } from '@nestjs/common';
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
    const address = this.addressRepository.create(createAddressDto);
    await this.addressRepository.save(address);
    return address;
  }

  async findAll() {
    const addresses = await this.addressRepository.find();

    return {
      total: addresses.length,
      data: addresses,
    };
  }

  async findOne(id: string) {
    const address = await this.addressRepository.findOne({ where: { id } });

    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) {
      return 'Endereço não encontrado';
    }
    if (Object.keys(updateAddressDto).length === 0) {
      return 'Nenhuma alteração foi feita';
    }

    const data = {
      ...address,
      ...updateAddressDto,
    };

    this.addressRepository.update(id, data);

    return 'Endereço atualizado com sucesso';
  }

  async remove(id: string) {
    const address = this.addressRepository.findOne({ where: { id } });

    if (!address) {
      return 'Endereço não encontrado';
    }

    await this.addressRepository.delete(id);

    return 'Endereço removido com sucesso';
  }
}
