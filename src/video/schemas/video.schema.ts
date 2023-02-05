import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop()
  VideoId: string;

  @Prop()
  VideoName: string;

  @Prop()
  NomberOfView: number;

  @Prop()
  Rating: number;

  @Prop()
  UserId: string
  
  @Prop()
  Path: string
}

export const VideoSchema = SchemaFactory.createForClass(Video);
