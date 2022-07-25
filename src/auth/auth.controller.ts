import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  regusterUser(@Body() registerAuthDTO: RegisterAuthDTO) {
    return this.authService.register(registerAuthDTO);
  }

  @Post('login')
  handleLogin(@Body() loginAuthDTO: LoginAuthDTO) {
    return this.authService.login(loginAuthDTO);
  }
}
