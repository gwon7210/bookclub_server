import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedUsers } from './common/seeds/user.seed';
import { seedMeetings } from './common/seeds/meeting.seed';
import { seedChatMessages } from './common/seeds/chat-message.seed';
import { seedNotifications } from './common/seeds/notification.seed';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 데이터베이스 연결 및 시드 데이터 삽입
  const dataSource = app.get(DataSource);
  try {
    // 이미 연결된 경우 연결을 끊고 다시 연결
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    
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

  } catch (error) {
    console.error('데이터베이스 초기화 중 오류 발생:', error);
    process.exit(1);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
