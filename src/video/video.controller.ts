import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  Header,
  HttpStatus,
  Res,
  Headers, 
} from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { statSync, createReadStream } from 'fs';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(@Param('id') id: string, @Headers() headers, @Res() res) {
    const videoPath = `assets/${id}.mp4`;
    const { size } = statSync(videoPath);
    const videoRange = headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunksize = end - start + 1;
      const readStreamfile = createReadStream(videoPath, {
        start,
        end,
        highWaterMark: 60,
      });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
      readStreamfile.pipe(res);
    } else {
      const head = {
        'Content-Length': size,
      };
      
      res.writeHead(HttpStatus.OK, head); //200
      createReadStream(videoPath).pipe(res);
    }
  }

  @Get()
  async getVideos(): Promise<Video[]> {
    return this.videoService.getVideos();
  }

  @Post()
  async createVideo(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
    return this.videoService.createVideo(
      createVideoDto.VideoId,
      createVideoDto.MovieName,
      createVideoDto.DirectorOfMovie,
      createVideoDto.NomberOfView,
      createVideoDto.Rating,
    );
  }

  @Patch(':VideoId')
  async updateVideo(@Body() updateVideoDto: UpdateVideoDto): Promise<Video> {
    return this.videoService.updateVideo(
      updateVideoDto.VideoId,
      updateVideoDto.MovieName,
      updateVideoDto.DirectorOfMovie,
      updateVideoDto.NomberOfView,
      updateVideoDto.Rating,
    );
  }
}
