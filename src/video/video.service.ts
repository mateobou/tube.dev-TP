import { Injectable } from '@nestjs/common';
import { Video, VideoDocument } from './schemas/video.schema';
import { VideoRepository } from './video.repository';

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
}
