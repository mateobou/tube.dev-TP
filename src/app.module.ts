import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { AuthModule } from './user/auth/auth.module';
import { UserRepository } from './user/user.repository';
import { JwtStrategy } from './user/auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://usertest:test@cluster0.m4mrrwq.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository, JwtStrategy],
})
export class AppModule {}
