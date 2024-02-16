import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsString({ message: "O campo 'Rua' deve ser do tipo string" })
  @MaxLength(255, {
    message: "O campo 'Rua' deve ter no máximo 255 caracteres",
  })
  @IsNotEmpty({ message: "O campo 'Rua' não pode estar vazio" })
  @ApiProperty({
    example: 'Rua dos Bobos',
    description: 'Rua do endereço',
  })
  readonly street: string;

  @IsString({ message: "O campo 'Numero' deve ser do tipo string" })
  @MaxLength(10, {
    message: "O campo 'Numero' deve ter no máximo 10 caracteres",
  })
  @IsNotEmpty({ message: "O campo 'Numero' não pode estar vazio" })
  @ApiProperty({
    example: '35A',
    description: 'Número do endereço',
  })
  readonly number: string;

  @IsString({ message: "O campo 'Cidade' deve ser do tipo string" })
  @MaxLength(255, {
    message: "O campo 'Cidade' deve ter no máximo 255 caracteres",
  })
  @IsNotEmpty({ message: "O campo 'Cidade' não pode estar vazio" })
  @ApiProperty({
    example: 'São Paulo',
    description: 'Cidade do endereço',
  })
  readonly city: string;

  @IsString({ message: "O campo 'Estado' deve ser do tipo string" })
  @MaxLength(255, {
    message: "O campo 'Bairro' deve ter no máximo 255 caracteres",
  })
  @IsNotEmpty({ message: "O campo 'Bairro' não pode estar vazio" })
  @ApiProperty({
    example: 'Santa Lúcia',
    description: 'Bairro do endereço',
  })
  readonly district: string;

  @IsOptional()
  @ApiProperty({
    example: 'Apto 101',
    description: 'Complemento do endereço',
  })
  readonly complement: string;

  @IsString({ message: "O campo 'CEP' deve ser do tipo string" })
  @Length(8, 8, { message: "O campo 'CEP' deve ter 8 caracteres" })
  @IsNotEmpty({ message: "O campo 'CEP' não pode estar vazio" })
  @ApiProperty({
    example: '08730300',
    description: 'CEP do endereço',
  })
  readonly zip: string;
}
