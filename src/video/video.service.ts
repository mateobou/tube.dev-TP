import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';



@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(Video.name) private readonly videoModel: Model<VideoDocument>,
    ) {}


    async create(createVideoDto: CreateVideoDto): Promise<Video> {
        const createdVideo = await this.videoModel.create(createVideoDto);
        return createdVideo;
      }

    
    async findAll(): Promise<Video[]> {
      return this.videoModel.find().exec();
    }

}