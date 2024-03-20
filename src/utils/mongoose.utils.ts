import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    type: Number,
    required: false,
    description: 'page number',
    example: 1,
  })
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    type: Number,
    description: 'limit number',
    required: false,
    example: 10,
  })
  limit: number = 10;
}

export function searchTransformer(obj: Object) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [key, { $regex: value, $options: 'i' }];
    }),
  );
}
