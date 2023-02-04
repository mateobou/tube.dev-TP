import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserdto } from './dto/create-user.dto';
import { UpdateUserdto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UserService } from './user.serivce';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // Récupère un utilisateur en fonction de son identifiant
  @Get('userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUseById(userId);
  }

  // Récupère tous les utilisateurs
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUser();
  }

  // Crée un nouvel utilisateur
  @Post()
  async createUser(@Body() createUserDto: CreateUserdto): Promise<User> {
    return this.userService.createUser(
      createUserDto.email,
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.password,
    );
  }

  // Connexion d'un utilisateur en fonction de son prénom
  @Get('/login')
  async logUser(@Param('firstName') firstName: string) {
    console.log(firstName);
    return this.userService.getUserByFirstName(firstName);
  }

  // Met à jour les informations d'un utilisateur
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserdto,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
