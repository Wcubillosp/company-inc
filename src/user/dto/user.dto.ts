import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
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
