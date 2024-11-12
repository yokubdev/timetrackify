import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddUserRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role' })
  @IsString({ message: 'Value must be a string' })
  readonly value: string;

  @ApiProperty({ example: '8', description: 'User id' })
  @IsNumber({}, { message: 'User id must be a number' })
  readonly userId: number;
}
