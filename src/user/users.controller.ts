import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserdto } from './dto/create-user.dto';
import { UpdateUserdto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UserService } from './user.serivce';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUseById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUser();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserdto): Promise<User> {
    return this.userService.createUser(
      createUserDto.email,
      createUserDto.username,
      createUserDto.lastName,
      createUserDto.password,
    );
  }

  /* Début tests unitaires type rentré BDD user sont identiques */
  @Post()
  validateusername(username: string) {
    if (typeof username !== 'string') {
      throw new Error('username doit être une chaîne de caractère');
    }
    if (!username.trim()) {
      throw new Error('username ne doit pas être vide');
    }

    return username;
  }

  @Post()
  validateLastName(lastName: string) {
    if (typeof lastName !== 'string') {
      throw new Error('lastName doit être une chaîne de caractère');
    }
    if (!lastName.trim()) {
      throw new Error('lastName ne doit pas être vide');
    }

    return lastName;
  }

  @Post()
  validateEmail(email: string) {
    if (typeof email !== 'string') {
      throw new Error('email doit être une chaîne de caractère');
    }
    if (!email.trim()) {
      throw new Error('email ne doit pas être vide');
    }

    return email;
  }

  @Post()
  validatePassword(password: string) {
    if (typeof password !== 'string') {
      throw new Error('password doit être une chaîne de caractère');
    }
    if (!password.trim()) {
      throw new Error('password ne doit pas être vide');
    }

    return password;
  }

  /* Fin tests unitaires type rentré BDD user sont identiques */

  /* Début test user.Name rentré dans BDD est unique */

  async validateUsername(username: string) {
    const existingUser = await this.userService.findOne({ username });
    if (existingUser != null || undefined) {
      throw new BadRequestException('username existe déjà');
    }
    return username;
  }

  /* Fin test user.Name rentré dans BDD est unique */

  @Get('/login')
  async logUser(@Param('username') username: string) {
    console.log(username);
    return this.userService.getUserByusername(username);
  }
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserdto,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
