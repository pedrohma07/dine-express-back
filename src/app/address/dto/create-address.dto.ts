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
  readonly street: string;

  @IsString({ message: "O campo 'Numero' deve ser do tipo string" })
  @MaxLength(10, {
    message: "O campo 'Numero' deve ter no máximo 10 caracteres",
  })
  @IsNotEmpty({ message: "O campo 'Numero' não pode estar vazio" })
  readonly number: string;

  @IsString({ message: "O campo 'Cidade' deve ser do tipo string" })
  @MaxLength(255, {
    message: "O campo 'Cidade' deve ter no máximo 255 caracteres",
  })
  @IsNotEmpty({ message: "O campo 'Cidade' não pode estar vazio" })
  readonly city: string;

  @IsString({ message: "O campo 'Estado' deve ser do tipo string" })
  @MaxLength(255, {
    message: "O campo 'Bairro' deve ter no máximo 255 caracteres",
  })
  @IsNotEmpty({ message: "O campo 'Bairro' não pode estar vazio" })
  readonly district: string;

  @IsOptional()
  readonly complement: string;

  @IsString({ message: "O campo 'CEP' deve ser do tipo string" })
  @Length(8, 8, { message: "O campo 'CEP' deve ter 8 caracteres" })
  @IsNotEmpty({ message: "O campo 'CEP' não pode estar vazio" })
  readonly zip: string;
}
