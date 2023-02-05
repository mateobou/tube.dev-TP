import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://usertest:test@cluster0.m4mrrwq.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModule,
    AuthModule,
    VideoModule,
    //MongooseModule.forRoot('mongodb+srv://usertest:test@cluster0.m4mrrwq.mongodb.net/test')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
