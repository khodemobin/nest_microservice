import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  name: string | null;

  family: string | null;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop()
  avatar: string | null;

  emailVerifiedAt: Date | null;

  phoneVerifiedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
