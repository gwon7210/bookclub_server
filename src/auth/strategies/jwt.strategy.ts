import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: '인증 토큰이 필요합니다',
        error: 'Unauthorized',
        details: {
          reason: 'NO_TOKEN',
          solution: 'Authorization 헤더에 Bearer 토큰을 포함해주세요'
        }
      });
    }

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: '토큰이 만료되었습니다',
        error: 'Unauthorized',
        details: {
          reason: 'TOKEN_EXPIRED',
          expiredAt: new Date(payload.exp * 1000).toISOString(),
          solution: '다시 로그인하여 새로운 토큰을 발급받으세요'
        }
      });
    }

    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: '유효하지 않은 토큰입니다',
        error: 'Unauthorized',
        details: {
          reason: 'INVALID_TOKEN',
          userId: payload.sub,
          solution: '다시 로그인하여 새로운 토큰을 발급받으세요'
        }
      });
    }

    return user;
  }
} 