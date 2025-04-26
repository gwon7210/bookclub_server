import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Meeting, ParticipationType, MeetingStatus } from './entities/meeting.entity';
import { MeetingApplication, ApplicationStatus } from '../applications/entities/meeting-application.entity';
import { MeetingParticipant } from '../participants/entities/meeting-participant.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { FilterMeetingsDto } from './dto/filter-meetings.dto';
import { JoinMeetingDto } from './dto/join-meeting.dto';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(MeetingApplication)
    private readonly applicationRepository: Repository<MeetingApplication>,
    @InjectRepository(MeetingParticipant)
    private readonly participantRepository: Repository<MeetingParticipant>,
  ) {}

  async create(userId: string, createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const meeting = this.meetingRepository.create({
      ...createMeetingDto,
      host_id: userId,
      status: MeetingStatus.ACTIVE,
    });

    const savedMeeting = await this.meetingRepository.save(meeting);

    // 호스트를 참여자로 자동 등록
    await this.participantRepository.save({
      meeting_id: savedMeeting.id,
      user_id: userId,
    });

    return savedMeeting;
  }

  async findAll(filterDto: FilterMeetingsDto): Promise<Meeting[]> {
    const { region, start_date, end_date, tags, page = 1, limit = 10 } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.meetingRepository
      .createQueryBuilder('meeting')
      .leftJoinAndSelect('meeting.host', 'host')
      .where('meeting.status = :status', { status: MeetingStatus.ACTIVE });

    if (region) {
      queryBuilder.andWhere('meeting.location LIKE :region', { region: `%${region}%` });
    }

    if (start_date) {
      queryBuilder.andWhere('meeting.date >= :start_date', { start_date });
    }

    if (end_date) {
      queryBuilder.andWhere('meeting.date <= :end_date', { end_date });
    }

    if (tags && tags.length > 0) {
      queryBuilder.andWhere('meeting.tags && :tags', { tags });
    }

    return queryBuilder
      .orderBy('meeting.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getMany();
  }

  async findOne(id: string): Promise<Meeting> {
    const meeting = await this.meetingRepository.findOne({
      where: { id },
      relations: ['host'],
    });

    if (!meeting) {
      throw new NotFoundException('모임을 찾을 수 없습니다.');
    }

    return meeting;
  }

  async join(userId: string, meetingId: string, joinMeetingDto: JoinMeetingDto) {
    const meeting = await this.findOne(meetingId);

    // 이미 신청했거나 참여 중인지 확인
    const existingApplication = await this.applicationRepository.findOne({
      where: { user_id: userId, meeting_id: meetingId },
    });

    const existingParticipant = await this.participantRepository.findOne({
      where: { user_id: userId, meeting_id: meetingId },
    });

    if (existingApplication || existingParticipant) {
      throw new BadRequestException('이미 신청했거나 참여 중인 모임입니다.');
    }

    // 참여 가능 여부 확인
    const participantCount = await this.participantRepository.count({
      where: { meeting_id: meetingId },
    });

    if (participantCount >= meeting.max_participants) {
      throw new BadRequestException('모임 정원이 가득 찼습니다.');
    }

    if (meeting.participation_type === ParticipationType.INSTANT) {
      // 즉시 참여
      return this.participantRepository.save({
        meeting_id: meetingId,
        user_id: userId,
      });
    } else {
      // 승인 필요
      return this.applicationRepository.save({
        meeting_id: meetingId,
        user_id: userId,
        status: ApplicationStatus.PENDING,
        message: joinMeetingDto.message || '',
      });
    }
  }

  async findApplicants(userId: string, meetingId: string) {
    const meeting = await this.findOne(meetingId);

    if (meeting.host_id !== userId) {
      throw new ForbiddenException('모임장만 신청자 목록을 볼 수 있습니다.');
    }

    return this.applicationRepository.find({
      where: { meeting_id: meetingId },
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async approveApplication(userId: string, meetingId: string, applicationId: string) {
    const meeting = await this.findOne(meetingId);

    if (meeting.host_id !== userId) {
      throw new ForbiddenException('모임장만 신청을 승인할 수 있습니다.');
    }

    const application = await this.applicationRepository.findOne({
      where: { id: applicationId, meeting_id: meetingId },
    });

    if (!application) {
      throw new NotFoundException('신청을 찾을 수 없습니다.');
    }

    if (application.status !== ApplicationStatus.PENDING) {
      throw new BadRequestException('이미 처리된 신청입니다.');
    }

    // 참여 가능 여부 재확인
    const participantCount = await this.participantRepository.count({
      where: { meeting_id: meetingId },
    });

    if (participantCount >= meeting.max_participants) {
      throw new BadRequestException('모임 정원이 가득 찼습니다.');
    }

    // 참여자로 등록
    await this.participantRepository.save({
      meeting_id: meetingId,
      user_id: application.user_id,
    });

    // 신청 상태 업데이트
    application.status = ApplicationStatus.APPROVED;
    return this.applicationRepository.save(application);
  }

  async rejectApplication(userId: string, meetingId: string, applicationId: string) {
    const meeting = await this.findOne(meetingId);

    if (meeting.host_id !== userId) {
      throw new ForbiddenException('모임장만 신청을 거절할 수 있습니다.');
    }

    const application = await this.applicationRepository.findOne({
      where: { id: applicationId, meeting_id: meetingId },
    });

    if (!application) {
      throw new NotFoundException('신청을 찾을 수 없습니다.');
    }

    if (application.status !== ApplicationStatus.PENDING) {
      throw new BadRequestException('이미 처리된 신청입니다.');
    }

    application.status = ApplicationStatus.REJECTED;
    return this.applicationRepository.save(application);
  }
} 