import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '123456',
    description: 'User password',
  })
  password: string;
}
