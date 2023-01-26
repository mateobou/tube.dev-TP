import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';
import { FilterQuery } from 'mongoose';



@Injectable()
export class VideoRepository {
    constructor ( @InjectModel(Video.name) private videoModel: Model<VideoDocument> ) {}

    async findOne(videosFilterQuery: FilterQuery<Video>): Promise<Video> {
        return this.videoModel.findOne(videosFilterQuery);
    }

    async find(videosFilterQuery: FilterQuery<Video>): Promise<Video[]> {
        return this.videoModel.find(videosFilterQuery)
    }

    async create(user: Video): Promise<Video> {
        const newVideo = new this.videoModel(Video);
        return newVideo.save()
    }

    async findOneAndUpdate(videosFilterQuery: FilterQuery<Video>, video: Partial<Video>): Promise<Video> {
        return this.videoModel.findOneAndUpdate(videosFilterQuery, Video, { new: true });
    }
}