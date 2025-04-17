import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { FilterMeetingsDto } from './dto/filter-meetings.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('meetings')
@UseGuards(JwtAuthGuard)
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  async create(@Req() req, @Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingsService.create(req.user.id, createMeetingDto);
  }

  @Get()
  async findAll(@Query() filterDto: FilterMeetingsDto) {
    return this.meetingsService.findAll(filterDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.meetingsService.findOne(id);
  }

  @Post(':id/join')
  async join(@Req() req, @Param('id') id: string) {
    return this.meetingsService.join(req.user.id, id);
  }

  @Get(':id/applicants')
  async getApplicants(@Req() req, @Param('id') id: string) {
    return this.meetingsService.findApplicants(req.user.id, id);
  }

  @Post(':id/approve/:applicationId')
  async approve(
    @Req() req,
    @Param('id') id: string,
    @Param('applicationId') applicationId: string,
  ) {
    return this.meetingsService.approveApplication(req.user.id, id, applicationId);
  }

  @Post(':id/reject/:applicationId')
  async reject(
    @Req() req,
    @Param('id') id: string,
    @Param('applicationId') applicationId: string,
  ) {
    return this.meetingsService.rejectApplication(req.user.id, id, applicationId);
  }
} 