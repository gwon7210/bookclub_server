import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Meeting } from '../../meetings/entities/meeting.entity';
import { User } from '../../users/entities/user.entity';

export enum MessageType {
  TEXT = 'text',
  SYSTEM = 'system'
}

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
  type: MessageType;

  @ManyToOne(() => Meeting, { onDelete: 'CASCADE' })
  meeting: Meeting;

  @Column()
  meeting_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  sender: User;

  @Column()
  sender_id: string;

  @CreateDateColumn({ name: 'sent_at' })
  sentAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 