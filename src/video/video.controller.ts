import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Header,
  HttpStatus,
  Res,
  Headers,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder, 
} from '@nestjs/common';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { statSync, createReadStream } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { SampleDto } from './dto/Sample.dto';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }
}

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
  
  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: SampleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log("Le fichier a été uploadé : "+ file.size)
    return {
      body,
      file: file.buffer.toString(),
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/pass-validation')
  uploadFileAndPassValidation(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'json',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return {
      body,
      file: file?.buffer.toString(),
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/fail-validation')
  uploadFileAndFailValidation(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpg',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
  /*async createVideo(@Body() createVideoDto: CreateVideoDto, @Req() req): Promise<Video> {
    console.log(req)
    return this.videoService.createVideo(
      createVideoDto.VideoId,
      createVideoDto.MovieName,
      createVideoDto.DirectorOfMovie,
      createVideoDto.NomberOfView,
      createVideoDto.Rating,
    );
  }*/

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
