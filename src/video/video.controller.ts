import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './schemas/video.schema';


@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}


    @Get()
    async findAll(): Promise<Video[]> {
        return this.videoService.findAll();
    }


  }
