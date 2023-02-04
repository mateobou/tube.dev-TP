import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

// définition de type pour le document utilisateur
export type UserDocument = User & Document;

@Schema()
export class User {
  // Propriété pour l'identifiant de l'utilisateur
  @Prop()
  userId: string;
  // Propriété pour le prénom de l'utilisateur
  @Prop()
  firstName: string;
  // Propriété pour le nom de famille de l'utilisateur
  @Prop()
  lastName: string;
  // Propriété pour l'adresse email de l'utilisateur
  @Prop()
  email: string;
  // Propriété pour le mot de passe de l'utilisateur
  @Prop()
  password: string;

  // Méthode pour valider le mot de passe d'un utilisateur
  async validatePassword(password: string): Promise<boolean> {
    // Comparaison du mot de passe entré avec celui enregistré
    return bcrypt.compare(password, this.password);
  }
}

// Factory pour créer le schéma Mongoose pour la classe User
export const UserSchema = SchemaFactory.createForClass(User);
