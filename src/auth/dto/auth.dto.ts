import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { WHITELIST_EMAIL } from 'src/constants/constants';

export class SignupDto {
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

  @IsString()
  @MinLength(6)
  @MaxLength(24)
  @ApiProperty({
    type: String,
    required: true,
    description: 'user password',
    example: 'supersecretpassword',
  })
  password: string;
}

export class SigninDto extends PickType(SignupDto, ['email', 'password']) {}

export class AdminSigninDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    type: String,
    required: true,
    description: 'user email',
    example: 'spectre@example.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(24)
  @ApiProperty({
    type: String,
    required: true,
    description: 'user password',
    example: 'supersecretpassword',
  })
  password: string;
}
