import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { IsCPF } from 'src/decorators/IsCPF';
import { RolesClient } from 'src/enums/roles.enum';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateClientDto extends CreateUserDto {
  @Length(11, 11)
  @IsCPF()
  @ApiProperty({
    example: '87723312083',
    description: 'CPF do cliente',
  })
  readonly cpf: string;

  @IsNotEmpty({ message: 'O papel não pode estar vazio' })
  @IsEnum(RolesClient, { message: 'Papel inválido' })
  readonly role = 'client';
}
