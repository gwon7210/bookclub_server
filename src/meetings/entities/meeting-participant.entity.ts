import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Meeting } from './meeting.entity';
import { User } from '../../users/entities/user.entity';

export enum AttendStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined'
}

@Entity('meeting_participant')
export class MeetingParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Meeting, { onDelete: 'CASCADE' })
  meeting: Meeting;

  @Column()
  meeting_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  user_id: string;

  @Column({
    type: 'enum',
    enum: AttendStatus,
    default: AttendStatus.PENDING
  })
  attend_status: AttendStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 