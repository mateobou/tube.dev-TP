import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosService } from '../video/video.service';
import { VideoController } from '../video/video.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Video, VideoSchema } from './schemas/video.schema';
import { VideosRepository } from './video.repository';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])],
   providers: [VideosService, VideosRepository],
   controllers: [VideoController],
})
export class VideoModule {}
