import { IsEnum } from 'class-validator';
import { AttendStatus } from '../../meetings/entities/meeting-participant.entity';

export class UpdateAttendStatusDto {
  @IsEnum(AttendStatus)
  attend_status: AttendStatus;
} 