import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.password,
    );
  }

  
  /* Début tests unitaires */
  @Post()
  validateFirstName(firstName: string) {
    if (typeof firstName !== 'string') {
      throw new Error('firstName doit être une chaîne de caractère');
    }
    if (!firstName.trim()) {
      throw new Error('firstName ne doit pas être vide');
    }

    return firstName;
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

  /* Fin tests unitaires */


  @Get('/login')
  async logUser(@Param('firstName') firstName: string) {
    console.log(firstName);
    return this.userService.getUserByFirstName(firstName);
  }
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserdto,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
