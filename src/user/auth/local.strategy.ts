import { Injectable, Module, UnauthorizedException } from '@nestjs/common';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  userRepository: any;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.userRepository.findOne({ id: payload.sub });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, UserRepository],
})
export class AuthModule {}
