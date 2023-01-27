import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';

@Injectable()
export class VideoRepository {
  delete(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async findOne(userFilterQuery: FilterQuery<Video>): Promise<Video> {
    return this.videoModel.findOne(userFilterQuery);
  }

  async find(videosFilterQuery: FilterQuery<Video>): Promise<Video[]> {
    return this.videoModel.find(videosFilterQuery);
  }

  async create(user: Video): Promise<Video> {
    const newUser = new this.videoModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(
    videoFilterQuery: FilterQuery<Video>,
    video: Partial<Video>,
  ): Promise<Video> {
    return this.videoModel.findOneAndUpdate(videoFilterQuery, video);
  }
}
