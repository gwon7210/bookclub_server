import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ParticipationType {
  INSTANT = 'instant',
  APPROVAL = 'approval',
}

export enum MeetingStatus {
  ACTIVE = 'active',
  ENDED = 'ended',
  CANCELLED = 'cancelled',
}

@Entity('meetings')
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @Column({ name: 'host_id' })
  host_id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100 })
  book_title: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @Column({ length: 200 })
  location: string;

  @Column()
  max_participants: number;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ParticipationType,
    default: ParticipationType.APPROVAL,
  })
  participation_type: ParticipationType;

  @Column({
    type: 'enum',
    enum: MeetingStatus,
    default: MeetingStatus.ACTIVE,
  })
  status: MeetingStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 