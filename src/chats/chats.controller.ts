import { Controller, Get, Post, Body, Param, Put, UseGuards, Request } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateAttendStatusDto } from './dto/update-attend-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':meetingId/messages')
  findMessages(@Param('meetingId') meetingId: string) {
    return this.chatsService.findMessages(meetingId);
  }

  @Post(':meetingId/messages')
  createMessage(
    @Request() req,
    @Param('meetingId') meetingId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.chatsService.createMessage(req.user.id, meetingId, createMessageDto);
  }

  @Put(':meetingId/attend-status')
  updateAttendStatus(
    @Request() req,
    @Param('meetingId') meetingId: string,
    @Body() updateAttendStatusDto: UpdateAttendStatusDto,
  ) {
    return this.chatsService.updateAttendStatus(req.user.id, meetingId, updateAttendStatusDto);
  }
} 