import { Length } from 'class-validator';
import { CreateUserDto } from 'src/app/modules/user/dto/create-user.dto';

export class CreateClientDto extends CreateUserDto {
  @Length(11, 11)
  readonly cpf;
}
