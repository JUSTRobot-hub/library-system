import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export type BookDocument = Book & Document;

@Schema({ timestamps: true, autoIndex: true })
export class Book {
  @Transform((value) => {
    if (value.obj) return value.obj._id.toString();
  })
  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description: 'The unique identifier for the Book',
    example: '5f9f9f9f9f9f9f9f9f9f9f9f',
  })
  _id: string;

  @Expose()
  @Prop({ type: String, required: true })
  @ApiProperty({
    type: String,
    required: true,
    description: 'book title',
    example: '7 habits of highly effective people',
  })
  title: string;

  @Expose()
  @Prop({ type: String, required: true })
  @ApiProperty({
    type: String,
    required: true,
    description: 'book author',
    example: 'Stephen Covey',
  })
  author: string;

  @Expose()
  @Prop({ type: String, required: true })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Book ISBN',
    example: '9780743269510',
  })
  ISBN: string;

  @Expose()
  @Prop({ type: Number, required: true })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'book stock quantity',
    example: 10,
  })
  stock: number;

  @Expose()
  @Prop({ type: String, required: true })
  @ApiProperty({
    type: String,
    required: true,
    description: 'book shelf location',
    example: 'A1-1-1',
  })
  shelfLocation: string;

  @Exclude()
  @Prop({ type: Boolean, default: false, index: true })
  removed: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
