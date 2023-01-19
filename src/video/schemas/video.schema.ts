import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';



export type VideoDocument = HydratedDocument<Video>;


@Schema()
export class Video {
  @Prop()
  id: number;

  @Prop()
  MovieName: string;

  @Prop()
  DirectorOfMovie: string;

  @Prop()
  NomberOfView: number;

  @Prop()
  Rating: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);