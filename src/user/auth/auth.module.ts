import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../schemas/user.schema';
import { UserRepository } from '../user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users.module';
import { Request } from 'express';
import { UserService } from '../user.serivce';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  providers: [JwtStrategy, UserRepository, AuthModule, UserService],
  exports: [UserRepository, JwtStrategy],
})
export class AuthModule {}
export type RequestWithUser = Request & { user: User };