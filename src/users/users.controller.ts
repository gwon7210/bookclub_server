import { Controller, Get, Post, Put, Body, Req, UseGuards, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    schema: {
      example: {
        success: true,
        data: {
          id: 'user_123456789',
          nickname: '홍길동',
          birthYear: '1995',
          gender: '남성',
          location: '37.5665, 126.9780',
          createdAt: '2024-03-20T10:30:00Z',
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '입력값 유효성 검사 실패',
  })
  @ApiResponse({
    status: 409,
    description: '닉네임 중복',
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { access_token } = await this.authService.login(user);
    
    return {
      success: true,
      data: {
        id: user.id,
        nickname: user.nickname,
        birthYear: user.birthYear,
        gender: user.gender,
        location: user.location,
        createdAt: user.createdAt,
        access_token,
      },
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.id, updateUserDto);
  }

  @Get('me/meetings')
  @UseGuards(JwtAuthGuard)
  async getMyMeetings(@Req() req) {
    return this.usersService.findUserMeetings(req.user.id);
  }

  @Get('me/requests')
  @UseGuards(JwtAuthGuard)
  async getMyRequests(@Req() req) {
    return this.usersService.findUserApplications(req.user.id);
  }
}