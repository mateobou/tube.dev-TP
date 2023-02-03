import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Pour la partie vidéo
import { VideoModule } from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    VideoModule,
    MongooseModule.forRoot('mongodb+srv://usertest:test@cluster0.m4mrrwq.mongodb.net/test')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
