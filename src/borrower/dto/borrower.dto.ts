import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { WHITELIST_EMAIL } from 'src/constants/constants';

export class CreateBorrowerDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    type: String,
    required: true,
    description: 'user username',
    example: 'spectre',
  })
  name: string;

  @Transform(({ value }) => value.toLowerCase())
  @IsEmail(
    {
      host_whitelist: WHITELIST_EMAIL,
    },
    { message: 'invalid email' },
  )
  @ApiProperty({
    type: String,
    required: true,
    description: 'user email',
    example: 'test@gmail.com',
  })
  email: string;
}

export class UpdateBorrowerDto extends PartialType(CreateBorrowerDto) {}
