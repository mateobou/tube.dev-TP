import { Module } from '@nestjs/common';
import { VideoService } from '../video/video.service';
import { VideoController } from '../video/video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideoRepository } from './video.repository';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])],
   controllers: [VideoController],
   providers: [VideoService, VideoRepository],
})
export class VideoModule {}
