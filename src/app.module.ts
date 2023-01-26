import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Pour la partie vidéo
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoModule } from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    /*
     MongooseModule.forRoot(
      "mongodb+srv://protube:test@cluster0.erzbctl.mongodb.net/test",
    ),
    //Ce code permet de se connecter à la bdd qu'a créé Luca. 
    //Pour le moment seulement Luca y a accès mais tu peux temporairement créer la tienne avec MongoDb Compass et en te connectant sur le site de
    //MongoDb 
    */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      synchronize: false,
      retryAttempts: 5,
      autoLoadEntities: true,
    }),
    VideoModule,
    MongooseModule.forRoot('mongodb://localhost:27017/protube')
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
