import { DataSource } from 'typeorm';
import { seedUsers } from './user.seed';
import { seedMeetings } from './meeting.seed';
import { seedChatMessages } from './chat-message.seed';
import { seedNotifications } from './notification.seed';
import { User } from '../../users/entities/user.entity';
import { Meeting } from '../../meetings/entities/meeting.entity';
import { ChatMessage } from '../../chats/entities/chat-message.entity';
import { Notification } from '../../notifications/entities/notification.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'bookstargram',
  password: '1234',
  database: 'bookstargram',
  entities: [User, Meeting, ChatMessage, Notification],
  synchronize: true,
});

const runSeed = async () => {
  try {
    await dataSource.initialize();
    console.log('데이터베이스 연결 성공');

    // 기존 데이터 삭제
    await dataSource.dropDatabase();
    console.log('기존 데이터 삭제 완료');

    // 테이블 재생성
    await dataSource.synchronize();
    console.log('테이블 재생성 완료');

    // 시드 데이터 삽입
    await seedUsers(dataSource);
    console.log('유저 데이터 시드 완료');

    await seedMeetings(dataSource);
    console.log('모임 데이터 시드 완료');

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