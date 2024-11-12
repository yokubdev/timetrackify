import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { User } from '../users/users.model';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Track } from './track.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('track')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Post()
  createTrack(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Patch(':id/end')
  endTrack(@Param('id') id: string) {
    console.log('id====', id);
    return this.trackService.endTrack(id);
  }

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [Track] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  async getAllTracks(@GetUser() user: User): Promise<Track[]> {
    return this.trackService.getTracksByUserId(String(user.id));
  }
}
