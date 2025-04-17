import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 13, unique: true })
  phoneNumber: string;

  @Column({ length: 20, unique: true })
  nickname: string;

  @Column()
  passwordHash: string;

  @Column({ length: 4 })
  birthYear: string;

  @Column({ length: 2 })
  gender: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 