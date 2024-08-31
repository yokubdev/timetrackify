import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'User role' })
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  readonly description: string;
}
