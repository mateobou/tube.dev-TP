import { Injectable } from '@nestjs/common';
import { Video, VideoDocument } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoModek}
import { VideosRepository } from './video.repository';
import { UpdateVideoDto } from './dto/update-video.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class VideosService {
    constructor (
        private readonly VideosRepository: VideosRepository ) {}
    


    async getVideoById(videoId: string): Promise<Video> {
        return this.VideosRepository.findOne({ videoId })
    }

    async getVideos(): Promise<Video[]> {
        return this.VideosRepository.find({});
    }

    async createVideo (email: string, age: number): Promise<Video> {
        return this.VideosRepository.create({
            userId: uuidv4(),
            email,
            age,
            favoriteFoods: []
        })
    }

    async updateVideo(userId: string, videoUpdates: UpdateVideoDto): Promise<Video> {
        return this.VideosRepository.findOneAndUpdate({ videoId }, videoUpdates);
    }


}
