import { Injectable } from '@nestjs/common';
import { Video, VideoDocument } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoRepository } from './video.repository';
import { UpdateVideoDto } from './dto/update-video.dto';
import { v4 as uuidv4 } from 'uuid';


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

    async createVideo (VideoId: number, MovieName: string, DirectorOfMovie: string, NomberOfView: number, Rating: number): Promise<Video> {
        return this.VideoRepository.create({
            VideoId : uuidv4(),
            MovieName,
            DirectorOfMovie,
            NomberOfView,
            Rating,
            Views: 0,
        })
    }

    async updateVideo(VideoId: number, MovieName: string, DirectorOfMovie: string, NomberOfView: number, Rating: number): Promise<Video> {
        return this.VideoRepository.findOneAndUpdate({ VideoId }, await this.updateVideo(VideoId, MovieName, DirectorOfMovie, NomberOfView, Rating));
  
    }


}
