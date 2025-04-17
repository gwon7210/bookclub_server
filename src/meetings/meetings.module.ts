import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { Meeting } from './entities/meeting.entity';
import { MeetingApplication } from '../applications/entities/meeting-application.entity';
import { MeetingParticipant } from '../participants/entities/meeting-participant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Meeting,
      MeetingApplication,
      MeetingParticipant,
    ]),
  ],
  controllers: [MeetingsController],
  providers: [MeetingsService],
  exports: [MeetingsService],
})
export class MeetingsModule {} 