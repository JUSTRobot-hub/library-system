import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export type BorrowerDocument = Borrower & Document;

@Schema({ timestamps: true, autoIndex: true })
export class Borrower {
  @Transform((value) => {
    if (value.obj) return value.obj._id.toString();
  })
  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description: 'The unique identifier for a Borrower',
    example: '5f9f9f9f9f9f9f9f9f9f9f9f',
  })
  _id: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Mostafa Ahmed',
    description: 'Borrower name',
  })
  @Prop({ type: String })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Borrower513613@mail.com',
    description: 'Email',
  })
  @Prop({ type: String })
  email: string;

  @Exclude()
  @Prop({ type: Boolean, default: false, index: true })
  removed: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export const BorrowerSchema = SchemaFactory.createForClass(Borrower);
