import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^010-\d{4}-\d{4}$/, {
    message: '전화번호는 010-XXXX-XXXX 형식이어야 합니다',
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;
} 
