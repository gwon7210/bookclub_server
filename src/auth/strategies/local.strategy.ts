import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'phoneNumber',
      passwordField: 'password',
    });
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    const user = await this.usersService.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new UnauthorizedException('전화번호 또는 비밀번호가 일치하지 않습니다');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('전화번호 또는 비밀번호가 일치하지 않습니다');
    }

    return user;
  }
} 