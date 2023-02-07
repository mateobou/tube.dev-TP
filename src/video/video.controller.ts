import { Controller, Get,Headers, Post, Body, Patch, Param, Delete , Injectable, PipeTransform, ArgumentMetadata, Header, HttpStatus, ParseFilePipeBuilder, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { statSync, createReadStream } from 'fs';
import { SampleDto } from './dto/Sample.dto';
import { Video } from './schemas/video.schema';
/* Model permet d'effectuer du CRUD sur la vidéo */
import{ Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
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
    constructor(private readonly videoService: VideoService,
    @InjectModel('Video') private readonly videoModel: Model<Video>
  ) {}


  /* Méthode pour enregistrer l'historique de visionnage dans la base de donnée */
  async enregistrerHistorique(userId: string, videoId: string) {
    const historique = new this.videoModel({
      userId: userId,
      videoId: videoId,
      vieweAt: Date.now(),
    });
    await historique.save();
  }
  
  @Get('/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(@Param('id') id: string, @Headers() headers, @Res() res) {
    /* Enregistrement de l'historique de visionnage */
    const userId = headers.userid;
    await this.enregistrerHistorique(userId, id);
    
    const videoPath = `./stockage/${id}.mp4`;
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
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async streamVideos(@Headers() headers, @Res() res){
    return (await this.videoService.getVideos()).forEach((video)=>{
      
      const videoPath = `./stockage/${video.VideoId}.mp4`;
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
    });
    /* Enregistrement de l'historique de visionnage */
    
  }
  
  @Get()
  async getVideos(): Promise<Video[]> {
    
    return this.videoService.getVideos();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/pass-validation')
  uploadFileAndPassValidation(
    @Body() body: CreateVideoDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'video/mp4',
        })
        .addMaxSizeValidator({
          maxSize: 200000
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    console.log("Le fichier a été uploadé : "+ file.size)
    this.videoService.createVideo(
      body.VideoName,
      body.UserId,
      file.originalname,
      file.buffer
    );
    return {
      body,
      file: file?.buffer.toString(),
    };
  }


  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
