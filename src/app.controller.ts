import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RequestWithUser } from './user/auth/auth.module';

// Ce contrôleur gère les requêtes HTTP liées à l'application
@Controller()
export class AppController {
  // Injection de dépendance vers le service de l'application
  constructor(private readonly appService: AppService) {}

  // Définition d'une route pour renvoyer une chaîne de caractères
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Définition d'une route pour effectuer la connexion de l'utilisateur
  @Get()
  // Utilise un garde de protection pour authentifier l'utilisateur
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: RequestWithUser) {
    // Renvoie les informations de l'utilisateur connecté dans la requête
    return req.user;
  }
}
