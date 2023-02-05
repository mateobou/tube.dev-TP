import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../schemas/user.schema';
import { UserRepository } from '../user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [JwtStrategy, UserRepository],
  exports: [UserRepository, JwtStrategy],
})
export class AuthModule {}
export type RequestWithUser = Request & { user: User };
