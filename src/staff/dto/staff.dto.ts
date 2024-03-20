import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'user name',
    example: 'Mostafa Ahmed',
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'user email',
    example: 'robot@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'user password',
    example: 'supersecretpassword',
  })
  password: string;
}
