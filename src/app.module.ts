import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MeetingsModule } from './meetings/meetings.module';
import { ApplicationsModule } from './applications/applications.module';
import { ParticipantsModule } from './participants/participants.module';
import { ChatsModule } from './chats/chats.module';
import { NotificationsModule } from './notifications/notifications.module';
import { User } from './users/entities/user.entity';
import { Meeting } from './meetings/entities/meeting.entity';
import { MeetingApplication } from './applications/entities/meeting-application.entity';
import { MeetingParticipant } from './participants/entities/meeting-participant.entity';
import { ChatMessage } from './chats/entities/chat-message.entity';
import { Notification } from './notifications/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'bookstargram',
      password: '1234',
      database: 'bookstargram',
      entities: [
        User,
        Meeting,
        MeetingApplication,
        MeetingParticipant,
        ChatMessage,
        Notification
      ],
      synchronize: true,
      charset: 'utf8mb4',
      timezone: '+09:00',
      logging: true,
      extra: {
        connectionLimit: 10,
      },
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    MeetingsModule,
    ApplicationsModule,
    ParticipantsModule,
    ChatsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
