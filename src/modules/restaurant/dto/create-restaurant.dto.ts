import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { IsCNPJ } from 'src/decorators/IsCNPJ';
import { RolesRestaurant } from 'src/enums/roles.enum';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateRestaurantDto extends CreateUserDto {
  @Length(14, 14)
  @IsCNPJ()
  @ApiProperty({
    example: '51876423000100',
    description: 'CNPJ do restaurante',
  })
  cnpj: string;

  @IsNotEmpty({ message: 'O papel não pode estar vazio' })
  @IsEnum(RolesRestaurant, { message: 'Papel inválido' })
  @ApiProperty({
    example: 'admin',
    description: 'Role do usuario no restaurante',
  })
  readonly role: RolesRestaurant;
}
