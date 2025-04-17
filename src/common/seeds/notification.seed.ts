import { DataSource } from 'typeorm';
import { Notification, NotificationType } from '../../notifications/entities/notification.entity';

export const notificationSeeds = [
  {
    user_id: '2',
    type: NotificationType.APPLICATION_RECEIVED,
    content: '해리포터 모임에 새로운 신청이 들어왔습니다.',
    is_read: false,
  },
  {
    user_id: '3',
    type: NotificationType.APPLICATION_APPROVED,
    content: '해리포터 모임 신청이 승인되었습니다.',
    is_read: true,
  },
  {
    user_id: '1',
    type: NotificationType.APPLICATION_APPROVED,
    content: '아몬드 모임 신청이 승인되었습니다.',
    is_read: true,
  },
  {
    user_id: '4',
    type: NotificationType.APPLICATION_RECEIVED,
    content: '이방인 모임에 새로운 신청이 들어왔습니다.',
    is_read: false,
  },
  {
    user_id: '5',
    type: NotificationType.APPLICATION_REJECTED,
    content: '데미안 모임 신청이 거절되었습니다.',
    is_read: true,
  },
  {
    user_id: '1',
    type: NotificationType.APPLICATION_APPROVED,
    content: '사피엔스 모임 신청이 승인되었습니다.',
    is_read: true,
  },
  {
    user_id: '1',
    type: NotificationType.MEETING_REMINDER,
    content: '아몬드 모임이 3시간 후에 시작됩니다.',
    is_read: false,
  },
  {
    user_id: '3',
    type: NotificationType.MEETING_REMINDER,
    content: '해리포터 모임이 1시간 후에 시작됩니다.',
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