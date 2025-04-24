import { DataSource } from 'typeorm';
import { MeetingParticipant, AttendStatus } from '../../participants/entities/meeting-participant.entity';
import { v4 as uuidv4 } from 'uuid';

export const meetingParticipantSeeds = [
  {
    id: uuidv4(),
    meeting_id: '550e8400-e29b-41d4-a716-446655440000', // 해리포터 모임
    user_id: '550e8400-e29b-41d4-a716-446655440000', // 호스트
    attend_status: AttendStatus.ATTENDING,
  },
  {
    id: uuidv4(),
    meeting_id: '550e8400-e29b-41d4-a716-446655440000',
    user_id: '550e8400-e29b-41d4-a716-446655440002', // 승인된 신청자
    attend_status: AttendStatus.ATTENDING,
  },
  {
    id: uuidv4(),
    meeting_id: '550e8400-e29b-41d4-a716-446655440001', // 아몬드 모임
    user_id: '550e8400-e29b-41d4-a716-446655440001', // 호스트
    attend_status: AttendStatus.ATTENDING,
  },
  {
    id: uuidv4(),
    meeting_id: '550e8400-e29b-41d4-a716-446655440001',
    user_id: '550e8400-e29b-41d4-a716-446655440000', // 승인된 신청자
    attend_status: AttendStatus.ATTENDING,
  },
  {
    id: uuidv4(),
    meeting_id: '550e8400-e29b-41d4-a716-446655440002', // 이방인 모임
    user_id: '550e8400-e29b-41d4-a716-446655440002', // 호스트
    attend_status: AttendStatus.ATTENDING,
  },
  {
    id: uuidv4(),
    meeting_id: '550e8400-e29b-41d4-a716-446655440003', // 데미안 모임
    user_id: '550e8400-e29b-41d4-a716-446655440003', // 호스트
    attend_status: AttendStatus.ATTENDING,
  },
  {
    id: uuidv4(),
    meeting_id: '550e8400-e29b-41d4-a716-446655440004', // 사피엔스 모임
    user_id: '550e8400-e29b-41d4-a716-446655440004', // 호스트
    attend_status: AttendStatus.ATTENDING,
  },
  {
    id: uuidv4(),
    meeting_id: '550e8400-e29b-41d4-a716-446655440004',
    user_id: '550e8400-e29b-41d4-a716-446655440000', // 승인된 신청자
    attend_status: AttendStatus.ATTENDING,
  },
];

export const seedMeetingParticipants = async (dataSource: DataSource) => {
  const meetingParticipantRepository = dataSource.getRepository(MeetingParticipant);
  
  for (const participantData of meetingParticipantSeeds) {
    const participant = meetingParticipantRepository.create(participantData);
    await meetingParticipantRepository.save(participant);
  }
}; 