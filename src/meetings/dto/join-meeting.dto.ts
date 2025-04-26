import { IsOptional, IsString } from 'class-validator';

export class JoinMeetingDto {
  @IsOptional()
  @IsString()
  message?: string;
} 