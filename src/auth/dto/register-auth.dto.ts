import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LoginAuthDTO } from './login-auth.dto';

export class RegisterAuthDTO extends PartialType(LoginAuthDTO) {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  cedula: string;
  @ApiProperty()
  direccion: string;
  readonly createdAt: Date;
}
