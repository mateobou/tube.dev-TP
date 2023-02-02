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
