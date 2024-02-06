import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @IsEmail({}, { message: 'E-mail inválido' })
  @ApiProperty({
    example: 'example@gamil.com',
    description: 'E-mail do usuário',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  readonly password: string;

  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  @ApiProperty({
    example: 'João dos Santos',
    description: 'Nome do usuário',
  })
  readonly name: string;

  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  @IsPhoneNumber('BR', {
    message: 'Número de telefone inválido, deve conter 11 dígitos sem pontos',
  })
  @ApiProperty({
    example: '11999999999',
    description: 'Telefone do usuário',
  })
  readonly phoneNumber: string;

  @IsNotEmpty({ message: 'O endereço não pode estar vazio' })
  @ValidateNested({ message: 'Endereço inválido' })
  @ApiProperty({
    type: CreateAddressDto,
    description: 'Endereço do usuário',
  })
  @Type(() => CreateAddressDto)
  readonly address: CreateAddressDto;
}
