import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  @MaxLength(11, { message: 'O telefone deve ter no máximo 11 caracteres' })
  phoneNumber: string;
}
