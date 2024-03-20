import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Borrower } from 'src/borrower/entities/borrower.entity';
import { Book } from 'src/book/entities/book.entity';
import { Staff } from 'src/staff/entities/staff.entity';

export type CheckoutDocument = Checkout & Document;

@Schema({ timestamps: true, autoIndex: true })
export class Checkout {
  @Transform((value) => {
    if (value.obj) return value.obj._id.toString();
  })
  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description: 'The unique identifier for a Checkout',
    example: '5f9f9f9f9f9f9f9f9f9f9f9f',
  })
  _id: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '5f9f9f9f9f9f9f9f9f9f9f9f',
    description: 'borrower id',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Borrower' })
  borrower: Borrower;

  @Expose()
  @ApiProperty({
    type: String,
    example: '5f9f9f9f9f9f9f9f9f9f9f9f',
    description: 'book id',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;

  @Expose()
  @ApiProperty({
    type: String,
    example: '5f9f9f9f9f9f9f9f9f9f9f9f',
    description: 'staff id',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Staff' })
  staff: Staff;

  @Expose()
  @ApiProperty({
    type: Date,
    example: '2021-10-31T00:00:00.000Z',
    description: 'checkout date',
  })
  @Prop({ type: Date })
  dueDate: Date;

  @Exclude()
  @Prop({ type: Boolean, default: false })
  returned: boolean;

  @Exclude()
  @Prop({ type: Boolean, default: false, index: true })
  removed: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
