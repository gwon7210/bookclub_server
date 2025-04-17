import { DataSource } from 'typeorm';
import { ChatMessage, MessageType } from '../../chats/entities/chat-message.entity';

export const chatMessageSeeds = [
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440000', // 해리포터 모임
    sender_id: '1', // 호스트
    type: MessageType.TEXT,
    content: '안녕하세요! 해리포터 모임에 오신 것을 환영합니다.',
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440000',
    sender_id: '3', // 참여자
    type: MessageType.TEXT,
    content: '안녕하세요! 저는 해리포터 시리즈를 좋아하는데, 다들 어떤 장면이 가장 기억나시나요?',
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440001', // 아몬드 모임
    sender_id: '2', // 호스트
    type: MessageType.TEXT,
    content: '아몬드 북클럽에 오신 것을 환영합니다. 오늘은 1장부터 3장까지 이야기 나눠보면 좋을 것 같아요.',
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440001',
    sender_id: '1', // 참여자
    type: MessageType.TEXT,
    content: '네, 좋습니다. 특히 윤재의 감정 표현 장면이 인상적이었어요.',
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440002', // 이방인 모임
    sender_id: '3', // 호스트
    type: MessageType.TEXT,
    content: '이방인 모임에 오신 것을 환영합니다. 실존주의에 대해 깊이 있게 이야기 나눠보면 좋겠습니다.',
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440003', // 데미안 모임
    sender_id: '4', // 호스트
    type: MessageType.TEXT,
    content: '데미안 북토크에 오신 것을 환영합니다. 자아와 성장에 대해 이야기 나눠보아요.',
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440004', // 사피엔스 모임
    sender_id: '5', // 호스트
    type: MessageType.TEXT,
    content: '사피엔스 스터디에 오신 것을 환영합니다. 인류의 역사에 대해 토론해보아요.',
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440004',
    sender_id: '1', // 참여자
    type: MessageType.TEXT,
    content: '네, 특히 농업 혁명 부분이 흥미로웠습니다.',
  },
];

export const seedChatMessages = async (dataSource: DataSource) => {
  const chatMessageRepository = dataSource.getRepository(ChatMessage);
  
  for (const messageData of chatMessageSeeds) {
    const message = chatMessageRepository.create(messageData);
    await chatMessageRepository.save(message);
  }
}; 