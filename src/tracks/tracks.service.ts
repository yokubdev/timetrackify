import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Track } from './track.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track) private trackRepository: typeof Track,
    private userService: UsersService,
  ) {}

  async create(dto: CreateTrackDto) {
    const user = await this.userService.getUserById(dto.userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    // Automatically set the start time to the current time
    const currentTime = new Date().toISOString();

    // Construct track data, including automatically generated timeInterval
    const trackData = {
      ...dto,
      timeInterval: {
        start: currentTime,
        end: null, // 'end' will be set when the track is stopped
        duration: null, // 'duration' will be set when the track is stopped
      },
    };

    // Create the track with the generated timeInterval
    const track = await this.trackRepository.create(trackData);

    return track;
  }

  async endTrack(trackId: string) {
    const track = await this.trackRepository.findByPk(trackId);
    console.log('trackId====', trackId);
    if (track) {
      track.timeInterval.end = new Date().toISOString();
      track.timeInterval.duration =
        (new Date(track.timeInterval.end).getTime() -
          new Date(track.timeInterval.start).getTime()) /
        1000;
      await track.save();
      return track;
    }
    throw new HttpException('Track not found', 404);
  }

  async getTracksByUserId(userId: string) {
    console.log('userId====', userId);
    if (!!userId) {
      const tracks = await this.trackRepository.findAll({
        where: { userId },
      });
      return tracks;
    }
    throw new HttpException('User not found', 404);
  }
}
