import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';



@Injectable()
export class VideoService {
    constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    ) {}

   findAll(): Promise<Video[]> {
    return this.videoRepository.find();
    }

    findOne(id: string): Promise<Video> {
    return this.videoRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<void> {
    await this.videoRepository.delete(id);
    }
}