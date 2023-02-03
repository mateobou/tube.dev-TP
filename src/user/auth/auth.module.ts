import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'local' })],
  providers: [LocalStrategy],
})
export class AuthModule {}
