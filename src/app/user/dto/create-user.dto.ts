import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/app/address/dto/create-address.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @IsEmail({}, { message: 'E-mail inválido' })
  readonly email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  readonly password: string;

  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  readonly name: string;

  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  @IsPhoneNumber('BR', { message: 'Número de telefone inválido' }) // padrao brasileiro ex:  82999999999
  readonly phoneNumber: string;

  @IsNotEmpty({ message: 'O endereço não pode estar vazio' })
  @ValidateNested({ message: 'Endereço inválido' })
  @Type(() => CreateAddressDto)
  readonly address: CreateAddressDto;
}
