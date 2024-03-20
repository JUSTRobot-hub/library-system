import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsDateString } from 'class-validator';

export class CreateCheckoutDto {
  @ApiProperty({
    required: true,
    description: 'Borrower ID',
    example: '5f9f9f9f9f9f9f9f9f9f9f9f',
  })
  @IsMongoId()
  borrower: string;

  @ApiProperty({
    required: true,
    description: 'Book ID',
    example: '5f9f9f9f9f9f9f9f9f9f9f9f',
  })
  @IsMongoId()
  book: string;

  @ApiProperty({
    required: true,
    description: 'Due date',
    example: '2023-12-31T00:00:00.000Z',
  })
  @IsDateString()
  dueDate: Date;
}
