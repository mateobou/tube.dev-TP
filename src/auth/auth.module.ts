import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../user/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
<<<<<<< HEAD
  exports: [AuthService],
=======
  exports: [AuthService, JwtModule],
>>>>>>> a77fec61fb53d76b73323993ff6d6a251108543d
})
export class AuthModule {}
