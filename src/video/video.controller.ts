import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { VideosService } from './video.service'; 
import { Video } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';


@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideosService) {}


  @Get(': videoId')
  async getUser(@Param('videoId') videoId: string): Promise<Video> {
  return this.videoService.getVideoById(videoId);
  }

  @Get()
  async getVideos(): Promise<Video []> {
  return this.videoService.getVideos();
  }

  @Post()
  async createVideo (@Body() createVideoDto: CreateVideoDto): Promise<Video> {
  return this.videoService.createVideo(
    createVideoDto.MovieName, 
    createVideoDto.Director, 
    createVideoDto.Views,
    createVideoDto.Rating,
    )};

  @Patch(':videoId')
    async updateVideo (@Param('videoId') videoId: string, @Body () updateVideoDto: UpdateVideoDto): Promise<Video> {
    return this.videoService.updateVideo (
        videoId,
        updateVideoDto.MovieName,
        updateVideoDto.Director,
        updateVideoDto.Views,
        updateVideoDto.Rating,
    )};

  }
