import { Length } from 'class-validator';
import { IsCPF } from 'src/decorators/IsCPF';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateClientDto extends CreateUserDto {
  @Length(11, 11)
  @IsCPF()
  readonly cpf;
}
