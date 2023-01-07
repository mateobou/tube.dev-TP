import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { VideoController } from './video/video.controller';
import { Video } from '../video/video.entity';




@Module({
  imports: [
   TypeOrmModule.forFeature([Video]),
  ],
  providers: [],
  controllers: [],
})
export class VideoModule {}
