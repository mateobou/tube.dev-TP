import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from '../video/video.controller';
import { VideoService } from '../video/video.service';
import { Video } from '../video/video.entity';

describe('VideoController', () => {
let controller: VideoController;
let service: VideoService;

beforeEach(async () => {
const module: TestingModule = await Test.createTestingModule({
controllers: [VideoController],
providers: [
VideoService,
{
provide: 'VideoRepository',
useValue: {
findOne: jest.fn().mockReturnValue(new Video({ title: 'test video' })),
save: jest.fn(),
},
},
],
}).compile();

controller = module.get<VideoController>(VideoController);
service = module.get<VideoService>(VideoService);

});

describe('addView', () => {
it('should add a view to the video', async () => {
const videoId = 1;
await controller.addView(videoId);
expect(service.addView).toHaveBeenCalledWith(videoId);
});
});
});