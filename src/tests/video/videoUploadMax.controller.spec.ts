import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from '../../video.controller';
import { VideoService } from '../../video.service';

/* Vérifie que le temps d'upload d'une vidéo ne dépasse pas 3 minutes */

describe('VideoController', () => {
    let VideoController: VideoController;

    beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
    controllers: [VideoController],
    providers: [VideoService],
    }).compile();

    videoController = app.get<VideoController>(VideoController);

    });

    describe('uploadVideo', () => {
    it('devrait renvoyer un temps de chargement maximum de 3 minutes', () => {
    const result = VideoController.uploadVideo();
    expect(result).toBeLessThanOrEqual(3 * 60 * 1000);
    });
    });
});