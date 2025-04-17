import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatMessage } from './entities/chat-message.entity';
import { Meeting } from '../meetings/entities/meeting.entity';
import { MeetingParticipant } from '../meetings/entities/meeting-participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, Meeting, MeetingParticipant])],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {} 