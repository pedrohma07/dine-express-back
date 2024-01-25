import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateAddressDto } from 'src/app/address/dto/create-address.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @IsEmail({}, { message: 'E-mail inválido' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  readonly password: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  @MaxLength(11, { message: 'O telefone deve ter no máximo 11 caracteres' })
  readonly phoneNumber: string;

  @IsNotEmpty({ message: 'O endereço não pode estar vazio' })
  readonly address: CreateAddressDto;
}
