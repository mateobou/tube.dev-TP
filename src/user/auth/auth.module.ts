import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Request } from 'express';
import { LocalStrategy } from './local.strategy';
import { User, UserSchema } from '../schemas/user.schema';
import { UserRepository } from '../user.repository';
import { MongooseModule } from '@nestjs/mongoose';

// Déclaration de type qui combine une requête express avec un objet 'user' de type User
export type RequestWithUser = Request & { user: User };

// Déclaration de type qui combine une requête express avec un objet 'user' de type User
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // Fourniture des fournisseurs nécessaires pour l'authentification, tels que la stratégie Locale, le référentiel d'utilisateurs et le modèle d'utilisateur
  providers: [LocalStrategy, UserRepository],
  // Export de UserRepository pour être utilisé dans d'autres modules
  exports: [UserRepository],
})
export class AuthModule {}
