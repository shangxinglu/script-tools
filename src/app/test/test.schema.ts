import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestDocument = HydratedDocument<Test>;

@Schema({
  collection: 'test',
})
export class Test {
  @Prop()
  name: string;

  @Prop()
  age: number;
}

export const TestSchema = SchemaFactory.createForClass(Test);
