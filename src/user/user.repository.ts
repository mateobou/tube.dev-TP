import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UserRepository {
  // Injection du modèle User dans le constructeur pour pouvoir effectuer des opérations CRUD sur ce modèle.
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Trouve un utilisateur en fonction de la requête spécifiée.
  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  // Trouve un utilisateur en fonction de son nom.
  async findOneByName(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  // Trouve plusieurs utilisateurs en fonction de la requête spécifiée.
  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery);
  }

  // Crée un nouvel utilisateur.

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user);
  }
}
