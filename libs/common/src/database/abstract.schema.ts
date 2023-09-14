import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export abstract class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;
}
