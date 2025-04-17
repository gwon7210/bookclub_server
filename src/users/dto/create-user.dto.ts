import { IsString, IsNotEmpty, Matches, Length, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^010-\d{4}-\d{4}$/, {
    message: '전화번호는 010-XXXX-XXXX 형식이어야 합니다',
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 10, { message: '닉네임은 2-10자 사이여야 합니다' })
  @Matches(/^[가-힣a-zA-Z0-9]+$/, {
    message: '닉네임은 한글, 영문, 숫자만 사용 가능합니다',
  })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20, { message: '비밀번호는 8-20자 사이여야 합니다' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/, {
    message: '비밀번호는 영문과 숫자를 포함해야 합니다',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}$/, { message: '출생 연도는 YYYY 형식이어야 합니다' })
  birthYear: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['남성', '여성'], { message: '성별은 남성 또는 여성만 가능합니다' })
  gender: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/, {
    message: '위치는 위도,경도 형식이어야 합니다 (예: 37.5665, 126.9780)',
  })
  location: string;
} 