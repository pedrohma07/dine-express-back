import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { IsCNPJ } from 'src/decorators/IsCNPJ';
import { RolesRestaurant } from 'src/enums/roles';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateRestaurantDto extends CreateUserDto {
  @Length(14, 14)
  @IsCNPJ()
  cnpj: string;

  @IsNotEmpty({ message: 'O papel não pode estar vazio' })
  @IsEnum(RolesRestaurant, { message: 'Papel inválido' })
  readonly role: RolesRestaurant;
}
