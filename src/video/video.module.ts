import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { VideoController } from './video/video.controller';
import { VideoService } from '../video/video.service';
import { VideoController } from '../video/video.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Video, VideoSchema } from './schemas/video.schema';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])],
   providers: [VideoService],
   controllers: [VideoController],
})
export class VideoModule {}
