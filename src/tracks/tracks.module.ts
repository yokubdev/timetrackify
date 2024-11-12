import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { UsersModule } from '../users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './track.model';
import { RolesModule } from '../roles/roles.module';
import { UserRoles } from '../roles/user-roles.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  imports: [
    UsersModule,
    AuthModule,
    SequelizeModule.forFeature([Track, UserRoles]),
    RolesModule,
  ],
})
export class TracksModule {}
