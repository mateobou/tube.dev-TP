import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserdto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  findOne(arg0: { username: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly userRepository: UserRepository) {}

  async getUseById(userId: string): Promise<User> {
    return this.userRepository.findOne({ userId });
  }
  async getUserByusername(username: string): Promise<User> {
    return this.userRepository.findOneByName({ username });
  }
  async getUser(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(
    //Si l'ordre n'est pas comme dans la requête envoyée ça n'attribut pas la valeur au bon endroit !
    email: string,
    username: string,
    lastName: string,
    password: string,
  ): Promise<User> {
    return this.userRepository.create({
      userId: uuidv4(),
      email: email,
      password: password,
      username: username,
      lastName: lastName,
    });
  }

  async updateUser(userId: string, userUpdate: UpdateUserdto): Promise<User> {
    return this.userRepository.findOneAndUpdate({ userId }, userUpdate);
  }
}
