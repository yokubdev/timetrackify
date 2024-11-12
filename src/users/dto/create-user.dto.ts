import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 16, { message: 'Password length must be between 6 and 16' })
  readonly password: string;
}
