import { DataSource } from 'typeorm';
import { seedUsers } from './user.seed';
import { seedMeetings } from './meeting.seed';
import { seedMeetingApplications } from './meeting-application.seed';
import { seedMeetingParticipants } from './meeting-participant.seed';
import { seedChatMessages } from './chat-message.seed';
import { seedNotifications } from './notification.seed';
import { User } from '../../users/entities/user.entity';
import { Meeting } from '../../meetings/entities/meeting.entity';
import { MeetingApplication } from '../../applications/entities/meeting-application.entity';
import { MeetingParticipant } from '../../participants/entities/meeting-participant.entity';
import { ChatMessage } from '../../chats/entities/chat-message.entity';
import { Notification } from '../../notifications/entities/notification.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'bookstargram',
  password: '1234',
  database: 'bookstargram',
  entities: [User, Meeting, MeetingApplication, MeetingParticipant, ChatMessage, Notification],
  synchronize: true,
});

const runSeed = async () => {
  try {
    await dataSource.initialize();
    console.log('데이터베이스 연결 성공');

    await seedUsers(dataSource);
    console.log('유저 데이터 시드 완료');

    await seedMeetings(dataSource);
    console.log('모임 데이터 시드 완료');

    await seedMeetingApplications(dataSource);
    console.log('모임 신청 데이터 시드 완료');

    await seedMeetingParticipants(dataSource);
    console.log('모임 참여자 데이터 시드 완료');

    await seedChatMessages(dataSource);
    console.log('채팅 메시지 데이터 시드 완료');

    await seedNotifications(dataSource);
    console.log('알림 데이터 시드 완료');

    await dataSource.destroy();
    console.log('데이터베이스 연결 종료');
  } catch (error) {
    console.error('시드 실행 중 오류 발생:', error);
    process.exit(1);
  }
};

runSeed(); 