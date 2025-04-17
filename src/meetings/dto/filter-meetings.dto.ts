export class FilterMeetingsDto {
  region?: string;
  start_date?: Date;
  end_date?: Date;
  tags?: string[];
  page?: number;
  limit?: number;
} 