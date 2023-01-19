import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';



export type VideoDocument = HydratedDocument<Video>;


@Schema()
export class Video {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);