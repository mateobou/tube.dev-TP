import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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
      VideoName: string,
      UserId:string,
      name,
      content
    ): Promise<Video> {
      let id : string = uuidv4() 
      console.log(id)
      console.log(name)
      fs.writeFile('./../stockage/videos/' +id+"/"+name,content,(err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("books.txt", "utf8"));
        }
      })
      return this.VideoRepository.create({
        VideoId: id,
        VideoName: VideoName,
        UserId: UserId,
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

