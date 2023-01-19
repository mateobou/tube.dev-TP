import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { VideoController } from './video/video.controller';
import { Video } from '../video/video.entity';
import { VideoService } from '../video/video.service';
import { VideoController } from '../video/video.controller';



@Module({
  imports: [
   TypeOrmModule.forFeature([Video]),
   providers: [VideoService],
   controllers: [VideoController],
  ],
  providers: [],
  controllers: [],
})
export class VideoModule {}