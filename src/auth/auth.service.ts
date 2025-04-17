import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.findByPhoneNumber(loginDto.phoneNumber);
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.usersService.validatePassword(
      user,
      loginDto.password,
    );
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, phoneNumber: user.phoneNumber };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 