import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  MovieName: string;

  @Column()
  DirectorOfMovie: string;

  @Column({ default: 1000 })
  NomberOfView: number;

  @Column({ default: 0 })
    Rating: number;
}

export class Video {}