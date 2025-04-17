import { DataSource } from 'typeorm';
import { MeetingParticipant, AttendStatus } from '../../participants/entities/meeting-participant.entity';

export const meetingParticipantSeeds = [
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440000', // 해리포터 모임
    user_id: '1', // 호스트
    attend_status: AttendStatus.ATTENDING,
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440000',
    user_id: '3', // 승인된 신청자
    attend_status: AttendStatus.ATTENDING,
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440001', // 아몬드 모임
    user_id: '2', // 호스트
    attend_status: AttendStatus.ATTENDING,
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440001',
    user_id: '1', // 승인된 신청자
    attend_status: AttendStatus.ATTENDING,
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440002', // 이방인 모임
    user_id: '3', // 호스트
    attend_status: AttendStatus.ATTENDING,
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440003', // 데미안 모임
    user_id: '4', // 호스트
    attend_status: AttendStatus.ATTENDING,
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440004', // 사피엔스 모임
    user_id: '5', // 호스트
    attend_status: AttendStatus.ATTENDING,
  },
  {
    meeting_id: '550e8400-e29b-41d4-a716-446655440004',
    user_id: '1', // 승인된 신청자
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