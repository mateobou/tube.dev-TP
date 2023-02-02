import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { VideoService } from './video.service'; 
import { Video } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';


@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}



  @Get()
  async createVideo (@Body() createVideoDto: CreateVideoDto): Promise<Video> {
  return this.videoService.createVideo(
    createVideoDto.VideoId,
    createVideoDto.MovieName, 
    createVideoDto.DirectorOfMovie, 
    createVideoDto.NomberOfView,
    createVideoDto.Rating,
    )};

  @Patch(':VideoId')
    async updateVideo (@Body () updateVideoDto: UpdateVideoDto): Promise<Video> {
    return this.videoService.updateVideo (
        updateVideoDto.VideoId,
        updateVideoDto.MovieName,
        updateVideoDto.DirectorOfMovie,
        updateVideoDto.NomberOfView,
        updateVideoDto.Rating,
    )};

  }
