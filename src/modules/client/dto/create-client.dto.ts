import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { IsCPF } from 'src/decorators/IsCPF';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateClientDto extends CreateUserDto {
  @Length(11, 11)
  @IsCPF()
  readonly cpf: string;

  // valida se o campo role é vazio e se é igual a 'client'
  @IsNotEmpty({ message: 'O papel não pode estar vazio' })
  @IsEnum({ CLIENT: 'client' }, { message: 'Papel inválido' })
  readonly role = 'client';
}
