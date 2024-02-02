import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { IsCPF } from 'src/decorators/IsCPF';
import { RolesClient } from 'src/enums/roles';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateClientDto extends CreateUserDto {
  @Length(11, 11)
  @IsCPF()
  readonly cpf: string;

  @IsNotEmpty({ message: 'O papel não pode estar vazio' })
  @IsEnum(RolesClient, { message: 'Papel inválido' })
  readonly role = 'client';
}
