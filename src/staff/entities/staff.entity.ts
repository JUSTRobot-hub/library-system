import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Expose, Transform, Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type StaffDocument = Staff & Document;

@Schema({ timestamps: true, autoIndex: true })
export class Staff {
  @Transform((value) => {
    if (value.obj) return value.obj._id.toString();
  })
  @ApiProperty({
    type: String,
    required: true,
    description: 'The unique identifier',
    example: '5f9f9f9f9f9f9f9f9f9f9f9f',
  })
  @Expose()
  _id: string;

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description: 'name',
    example: 'Youssef',
  })
  @Prop({ type: String, required: true })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description: 'email',
    example: 'example@gmail.com',
  })
  @Prop({ type: String, required: true })
  email: string;

  @Exclude()
  @Prop({ type: String })
  password: string;

  @Exclude()
  @Prop({ type: Boolean, default: false })
  removed: boolean;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'token',
    example: 'esrdarfwaoptgqpaiowetgjpq23jtpajepifjpaeijrtfpeajtfpj',
  })
  token: string;

  isAdmin: boolean;

  passwordCheck: (password: string) => Promise<boolean>;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);

StaffSchema.pre('save', async function (this: StaffDocument, next: any) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

StaffSchema.methods.passwordCheck = async function (password: string) {
  const isPassword = await bcrypt.compare(password, this.password);
  return isPassword;
};
