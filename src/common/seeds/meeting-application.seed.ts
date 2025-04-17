import { DataSource } from 'typeorm';
import { MeetingApplication, ApplicationStatus } from '../../applications/entities/meeting-application.entity';

export const meetingApplicationSeeds = [
  {
    id: '660e8400-e29b-41d4-a716-446655440000',
    meeting_id: '550e8400-e29b-41d4-a716-446655440000',
    user_id: '2',
    status: ApplicationStatus.PENDING,
    message: '해리포터 시리즈를 좋아해서 신청합니다!',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440001',
    meeting_id: '550e8400-e29b-41d4-a716-446655440000',
    user_id: '3',
    status: ApplicationStatus.APPROVED,
    message: '마법사 세계에 관심이 많습니다.',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440002',
    meeting_id: '550e8400-e29b-41d4-a716-446655440001',
    user_id: '1',
    status: ApplicationStatus.APPROVED,
    message: '아몬드를 읽고 감동받았어요.',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440003',
    meeting_id: '550e8400-e29b-41d4-a716-446655440002',
    user_id: '4',
    status: ApplicationStatus.PENDING,
    message: '실존주의에 대해 관심이 있습니다.',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440004',
    meeting_id: '550e8400-e29b-41d4-a716-446655440003',
    user_id: '5',
    status: ApplicationStatus.APPROVED,
    message: '데미안을 읽고 싶었어요.',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440005',
    meeting_id: '550e8400-e29b-41d4-a716-446655440004',
    user_id: '6',
    status: ApplicationStatus.APPROVED,
    message: '사피엔스 스터디에 참여하고 싶습니다.',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440006',
    meeting_id: '550e8400-e29b-41d4-a716-446655440005',
    user_id: '7',
    status: ApplicationStatus.PENDING,
    message: '82년생 김지영을 읽고 싶어요.',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440007',
    meeting_id: '550e8400-e29b-41d4-a716-446655440006',
    user_id: '8',
    status: ApplicationStatus.APPROVED,
    message: '우주에 관심이 많습니다.',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440008',
    meeting_id: '550e8400-e29b-41d4-a716-446655440007',
    user_id: '9',
    status: ApplicationStatus.APPROVED,
    message: '작은 아씨들을 좋아합니다.',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440009',
    meeting_id: '550e8400-e29b-41d4-a716-446655440008',
    user_id: '10',
    status: ApplicationStatus.PENDING,
    message: '동물농장을 읽고 싶어요.',
  }
];

export const seedMeetingApplications = async (dataSource: DataSource) => {
  const meetingApplicationRepository = dataSource.getRepository(MeetingApplication);
  
  for (const applicationData of meetingApplicationSeeds) {
    const application = meetingApplicationRepository.create(applicationData);
    await meetingApplicationRepository.save(application);
  }
}; 