import { Injectable } from '@nestjs/common';
import { Video, VideoDocument } from './schemas/video.schema';
import { VideoRepository } from './video.repository';
import fs from 'fs'
@Injectable()
export class VideoService {
    constructor (
        private readonly VideoRepository: VideoRepository ) {}
    

    

    async getVideoById(videoId: string): Promise<Video> {
        return this.VideoRepository.findOne({ videoId })
    }

    async getVideos(): Promise<Video[]> {
        return this.VideoRepository.find({});
    }

    async createVideo (VideoId: string, MovieName: string, DirectorOfMovie: string, NomberOfView: number, Rating: number): Promise<Video> {
        return this.VideoRepository.create({
            VideoId,
            MovieName,
            DirectorOfMovie,
            NomberOfView,
            Rating,
        })
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

        res.writeHead(200, {'Content-Type': 'video/mp4'})
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
