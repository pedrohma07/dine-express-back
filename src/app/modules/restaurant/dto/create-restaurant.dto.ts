import { Length } from 'class-validator';
import { CreateUserDto } from 'src/app/modules/user/dto/create-user.dto';

export class CreateRestaurantDto extends CreateUserDto {
  // Cnpj is a string with 14 characters
  @Length(14, 14)
  cnpj: string;
}
