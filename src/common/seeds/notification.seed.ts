import { DataSource } from 'typeorm';
import { Notification, NotificationType } from '../../notifications/entities/notification.entity';

export const notificationSeeds = [
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    type: NotificationType.MEETING_CREATED,
    content: '새로운 모임 "해리포터와 마법사의 돌 함께 읽기"가 생성되었습니다.',
    is_read: false,
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440001',
    type: NotificationType.APPLICATION_RECEIVED,
    content: '새로운 참가 신청이 도착했습니다.',
    is_read: false,
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440002',
    type: NotificationType.APPLICATION_APPROVED,
    content: '참가 신청이 승인되었습니다.',
    is_read: true,
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440003',
    type: NotificationType.MEETING_UPDATED,
    content: '모임 정보가 업데이트되었습니다.',
    is_read: false,
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440004',
    type: NotificationType.MEETING_REMINDER,
    content: '내일 모임이 예정되어 있습니다.',
    is_read: false,
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440005',
    type: NotificationType.APPLICATION_REJECTED,
    content: '참가 신청이 거절되었습니다.',
    is_read: true,
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440006',
    type: NotificationType.MEETING_CANCELLED,
    content: '모임이 취소되었습니다.',
    is_read: false,
  },
];

export const seedNotifications = async (dataSource: DataSource) => {
  const notificationRepository = dataSource.getRepository(Notification);
  
  for (const notificationData of notificationSeeds) {
    const notification = notificationRepository.create(notificationData);
    await notificationRepository.save(notification);
  }
}; 