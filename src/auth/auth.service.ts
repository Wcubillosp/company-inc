import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { User } from 'src/user/interfaces/user.interface';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDTO: RegisterAuthDTO) {
    const { password, ...user } = registerAuthDTO;
    const getUser = await this.userModel.findOne({ email: user.email });
    if (getUser) throw new HttpException('USER_FOUND', HttpStatus.CONFLICT);
    const userParse = {
      ...user,
      password: await generateHash(password),
    };
    const newUser = await this.userModel.create(userParse);
    return `Usuario ${newUser.email} creado correctamente`;
  }

  async login(loginAuthDto: LoginAuthDTO) {
    const { email, password } = loginAuthDto;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const checkPass = await compareHash(password, user.password);
    if (!checkPass)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const payload = { userID: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { 'Bearer Token': token };
  }
}
