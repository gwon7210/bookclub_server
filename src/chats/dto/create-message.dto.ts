import { IsNotEmpty, IsString, IsUUID, IsEnum } from 'class-validator';
import { MessageType } from '../entities/chat-message.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  meetingId: string;

  @IsEnum(MessageType)
  type: MessageType = MessageType.TEXT;
} 