import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'book title',
    example: '7 habits of highly effective people',
  })
  title: string;

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'book author',
    example: 'Stephen Covey',
  })
  author: string;

  @IsString()
  @MaxLength(13)
  @ApiProperty({
    type: String,
    required: true,
    description: 'Book ISBN',
    example: '9780743269510',
  })
  ISBN: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'book stock quantity',
    example: 10,
  })
  stock: number;

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'book shelf location',
    example: 'A1-1-1',
  })
  shelfLocation: string;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}

export class SearchBookDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: 'book title',
    example: '7 habits of highly effective people',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: 'book author',
    example: 'Stephen Covey',
  })
  author?: string;

  @IsOptional()
  @IsString()
  @MaxLength(13)
  @ApiProperty({
    type: String,
    required: false,
    description: 'Book ISBN',
    example: '9780743269510',
  })
  ISBN?: string;
}
