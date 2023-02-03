import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';


export type VideoDocument = Video & Document;




@Schema()
export class Video {
  @Prop()
  VideoId: string;

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