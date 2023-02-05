import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from '../video/video.service';



/* test unitaire pour vérifié que la taille d'une video ne dépasse pas 100 Mo */


describe('VideoService', () => {
    let service: VideoService;

    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    providers: [VideoService],
    }).compile();

    service = module.get<VideoService>(VideoService);

    });

    it('Devrait être capable de télécharger une vidéo de 100 MB ou moins', async () => {
    const videoSize = 98 * 1024 * 1024; // 98 MB

    const result = await service.uploadVideo(Buffer.alloc(videoSize));
    expect(result).toBe(true);

    });

    it('Ca ne devrait pas être possible de télécharger 100 MB de vidéo', async () => {
    const videoSize = 102 * 1024 * 1024; // 102 MB

    try {
    await service.uploadVideo(Buffer.alloc(videoSize));
    fail('Upload devrait avoir échoué');
    } catch (error) {
    expect(error.message).toBe('La taille de la vidéo télécharger dépasse les 100 mégabits');
    }

    });
});