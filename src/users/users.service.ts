import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Meeting } from '../meetings/entities/meeting.entity';
import { MeetingParticipant } from '../meetings/entities/meeting-participant.entity';
import { MeetingApplication } from '../applications/entities/meeting-application.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(MeetingParticipant)
    private readonly participantRepository: Repository<MeetingParticipant>,
    @InjectRepository(MeetingApplication)
    private readonly applicationRepository: Repository<MeetingApplication>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 전화번호 중복 확인
    const existingUser = await this.userRepository.findOne({
      where: { phoneNumber: createUserDto.phoneNumber },
    });
    if (existingUser) {
      this.logger.warn(`회원가입 실패 - 전화번호 중복: ${createUserDto.phoneNumber}`);
      throw new ConflictException({
        statusCode: 409,
        message: '이미 등록된 전화번호입니다',
        error: 'Conflict',
        details: {
          field: 'phoneNumber',
          value: createUserDto.phoneNumber
        }
      });
    }

    // 닉네임 중복 확인
    const existingNickname = await this.userRepository.findOne({
      where: { nickname: createUserDto.nickname },
    });
    if (existingNickname) {
      this.logger.warn(`회원가입 실패 - 닉네임 중복: ${createUserDto.nickname}`);
      throw new ConflictException({
        statusCode: 409,
        message: '이미 사용 중인 닉네임입니다',
        error: 'Conflict',
        details: {
          field: 'nickname',
          value: createUserDto.nickname
        }
      });
    }

    try {
      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // 사용자 생성
      const user = this.userRepository.create({
        id: uuidv4(),
        phoneNumber: createUserDto.phoneNumber,
        nickname: createUserDto.nickname,
        passwordHash: hashedPassword,
        birthYear: createUserDto.birthYear,
        gender: createUserDto.gender,
        location: createUserDto.location,
      });

      const savedUser = await this.userRepository.save(user);
      this.logger.log(`회원가입 성공 - 사용자 ID: ${savedUser.id}, 닉네임: ${savedUser.nickname}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`회원가입 중 오류 발생: ${error.message}`, error.stack);
      throw new InternalServerErrorException({
        statusCode: 500,
        message: '회원가입 중 오류가 발생했습니다',
        error: 'Internal Server Error',
        details: {
          error: error.message,
          timestamp: new Date().toISOString()
        }
      });
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phoneNumber: email } });
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(userId);
    
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return updatedUser;
  }

  async findUserMeetings(userId: string) {
    // 내가 만든 모임
    const hostedMeetings = await this.meetingRepository.find({
      where: { host_id: userId },
      order: { created_at: 'DESC' },
    });

    // 내가 참여한 모임
    const participatedMeetings = await this.participantRepository.find({
      where: { user_id: userId },
      relations: ['meeting'],
      order: { createdAt: 'DESC' },
    });

    return {
      hosted: hostedMeetings,
      participated: participatedMeetings.map(p => p.meeting),
    };
  }

  async findUserApplications(userId: string) {
    const applications = await this.applicationRepository.find({
      where: { user_id: userId },
      relations: ['meeting'],
      order: { created_at: 'DESC' },
    });

    return applications;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phoneNumber } });
  }

  async findByNickname(nickname: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { nickname } });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
} 