import { Length } from 'class-validator';
import { IsCNPJ } from 'src/app/decorators/IsCNPJ';
import { CreateUserDto } from 'src/app/modules/user/dto/create-user.dto';

export class CreateRestaurantDto extends CreateUserDto {
  @Length(14, 14)
  @IsCNPJ()
  cnpj: string;
}
