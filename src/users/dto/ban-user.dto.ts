import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: '8', description: 'User id' })
  @IsNumber({}, { message: 'User id must be a number' })
  readonly userId: number;

  @ApiProperty({ example: 'bad actions', description: 'Ban reason' })
  @IsString({ message: 'Ban reason must be a string' })
  readonly banReason: string;
}
