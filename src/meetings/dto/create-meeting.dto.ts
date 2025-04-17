import { ParticipationType, AgeFilter, GenderFilter } from '../entities/meeting.entity';

export class CreateMeetingDto {
  title: string;
  book_title: string;
  date: Date;
  time: string;
  location: string;
  max_participants: number;
  description: string;
  participation_type: ParticipationType;
  age_filter?: AgeFilter;
  gender_filter?: GenderFilter;
} 