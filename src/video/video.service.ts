import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import fs from 'fs'
import { VideoRepository } from './video.repository';
import { Video } from './schemas/video.schema';
@Injectable()
export class VideoService {
  constructor (
    private readonly VideoRepository: VideoRepository ) {}
    async createVideo(
      //Si l'ordre n'est pas comme dans la requête envoyée ça n'attribut pas la valeur au bon endroit !
      VideoId: string,
      VideoName: string,
      UserId:string,
      NomberOfView: number,
      Rating: number
    ): Promise<Video> {
      return this.VideoRepository.create({
        VideoId: uuidv4(),
        VideoName: VideoName,
        UserId: "",
        NomberOfView: 0,
        Rating: 0
      });
    }

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
  async getVideoById(videoId: string): Promise<Video> {
    return this.VideoRepository.findOne({ videoId })
}

async getVideos(): Promise<Video[]> {
    return this.VideoRepository.find({});
}

async updateVideo(VideoId: string, MovieName: string, DirectorOfMovie: string, NomberOfView: number, Rating: number): Promise<Video> {
    return this.VideoRepository.findOneAndUpdate({ VideoId }, await this.updateVideo(VideoId, MovieName, DirectorOfMovie, NomberOfView, Rating));

}

postVideo(): string {
    return 'Hello World!';
}
async storeVideo(file){
    var { size } = fs.statSync('./Fun.mp4');
    var start = 0
    var end = .05*size;

    var videoClip = fs.createReadStream('./Fun.mp4', { start, end })
    var fileCopy = fs.createWriteStream('./Fun-Copy.mp4')

    //res.writeHead(200, {'Content-Type': 'video/mp4'})
    videoClip.pipe(file)
    videoClip.pipe(fileCopy)
    /*const user = await this.userModel.findById(userId);
    if (!user) {
    throw 'User not found';
    }
    const formData = new FormData();
    formData.append('image', avatar.buffer.toString('base64'));
    const { data: imageData } = await firstValueFrom(
    this.httpService
        .post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMG_API_KEY}`,
        formData,
        )
        .pipe(
        catchError((error: AxiosError) => {
            throw error;
        }),
        ),
    );
    user.updateOne({ avatar: imageData.data.url }).exec();*/
}
}
function uuidv4(): string {
  throw new Error('Function not implemented.');
}

