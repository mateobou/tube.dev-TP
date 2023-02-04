import { Injectable, Module, UnauthorizedException } from '@nestjs/common';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserRepository } from '../user.repository';

// Déclaration du service pour la stratégie "local"
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // Injection de dépendance de UserRepository
  constructor(private readonly userRepository: UserRepository) {
    // Appel au constructeur parent en passant la configuration nécessaire pour passport-jwt
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // Méthode qui sera appelée pour valider l'utilisateur
  async validate(email: string, password: string): Promise<any> {
    // Récupération de l'utilisateur à partir du repoository
    const user = await this.userRepository.findOne({ email });

    // Si l'utilisateur n'est pas trouvé, on lance une exception d'autorisation
    if (!user) {
      throw new UnauthorizedException();
    }
    // Si le mot de passe ne correspond pas, on lance une exception d'autorisation
    if (!user.validatePassword(password)) {
      throw new UnauthorizedException();
    }
    // Si tout est OK, on retourne l'utilisateur
    return user;
  }
}

// Déclaration du module d'authentification
@Module({
  // Importation du module de passport pour utiliser la stratégie "local"
  imports: [PassportModule.register({ defaultStrategy: 'local' })],
  // Injection de dépendance des services nécessaires
  providers: [LocalStrategy, UserRepository],
})
export class AuthModule {}
