import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Meeting } from '../../meetings/entities/meeting.entity';

export enum AttendStatus {
  ATTENDING = 'attending',
  NOT_ATTENDING = 'not_attending',
}

@Entity('meeting_participants')
export class MeetingParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Meeting)
  @JoinColumn({ name: 'meeting_id' })
  meeting: Meeting;

  @Column()
  meeting_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @Column({
    type: 'enum',
    enum: AttendStatus,
    default: AttendStatus.ATTENDING,
  })
  attend_status: AttendStatus;

  @CreateDateColumn()
  joined_at: Date;
} 