import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserdto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(private readonly userRepository: UserRepository) {}

  // Récupère un utilisateur en fonction de son identifiant
  async getUseById(userId: string): Promise<User> {
    return this.userRepository.findOne({ userId });
  }
  // Récupère un utilisateur en fonction de son nom
  async getUserByFirstName(firstName: string): Promise<User> {
    return this.userRepository.findOneByName({ firstName });
  }
  // Récupère tous les utilisateurs
  async getUser(): Promise<User[]> {
    return this.userRepository.find({});
  }

  // Crée un utilisateur
  async createUser(
    //Si l'ordre n'est pas comme dans la requête envoyée ça n'attribut pas la valeur au bon endroit !
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.create({
      userId: uuidv4(),
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      validatePassword: function (password: string): Promise<boolean> {
        throw new Error('Function not implemented.');
      },
    });
  }

  async updateUser(userId: string, userUpdate: UpdateUserdto): Promise<User> {
    return this.userRepository.findOneAndUpdate({ userId }, userUpdate);
  }
}
