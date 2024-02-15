import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestBody } from './models/LoginRequestBody';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @ApiTags('auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Efetua o login do usuário.' })
  @ApiBody({
    type: LoginRequestBody,
  })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Post('verify-token')
  async verifyToken(@Req() request: Request) {
    const token = request.headers['authorization'].split(' ')[1];

    const decodedToken = await this.authService.validateToken(token);
    return decodedToken;
  }
}
