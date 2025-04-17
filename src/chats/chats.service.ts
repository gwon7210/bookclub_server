import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { Meeting } from '../meetings/entities/meeting.entity';
import { MeetingParticipant } from '../meetings/entities/meeting-participant.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateAttendStatusDto } from './dto/update-attend-status.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(MeetingParticipant)
    private readonly participantRepository: Repository<MeetingParticipant>,
  ) {}

  async findMessages(meetingId: string) {
    const meeting = await this.meetingRepository.findOne({
      where: { id: meetingId },
    });

    if (!meeting) {
      throw new NotFoundException('모임을 찾을 수 없습니다.');
    }

    return this.chatMessageRepository.find({
      where: { meeting_id: meetingId },
      relations: ['sender'],
      order: { sentAt: 'ASC' },
    });
  }

  async createMessage(userId: string, meetingId: string, createMessageDto: CreateMessageDto) {
    const meeting = await this.meetingRepository.findOne({
      where: { id: meetingId },
    });

    if (!meeting) {
      throw new NotFoundException('모임을 찾을 수 없습니다.');
    }

    // 참여자 확인
    const participant = await this.participantRepository.findOne({
      where: { user_id: userId, meeting_id: meetingId },
    });

    if (!participant) {
      throw new ForbiddenException('모임 참여자만 메시지를 보낼 수 있습니다.');
    }

    const message = this.chatMessageRepository.create({
      content: createMessageDto.content,
      type: createMessageDto.type,
      meeting_id: meetingId,
      sender_id: userId,
    });

    return this.chatMessageRepository.save(message);
  }

  async updateAttendStatus(userId: string, meetingId: string, updateAttendStatusDto: UpdateAttendStatusDto) {
    const meeting = await this.meetingRepository.findOne({
      where: { id: meetingId },
    });

    if (!meeting) {
      throw new NotFoundException('모임을 찾을 수 없습니다.');
    }

    // 참여자 확인
    const participant = await this.participantRepository.findOne({
      where: { user_id: userId, meeting_id: meetingId },
    });

    if (!participant) {
      throw new ForbiddenException('모임 참여자만 참석 여부를 변경할 수 있습니다.');
    }

    participant.attend_status = updateAttendStatusDto.attend_status;
    return this.participantRepository.save(participant);
  }
} 