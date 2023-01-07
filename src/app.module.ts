import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Pour la partie vidéo
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video/video.entity';
import { VideoModule } from './video/video.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Video],
      synchronize: false,
      retryAttempts: 5,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}