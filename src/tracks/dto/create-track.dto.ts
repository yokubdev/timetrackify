import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: '123', description: 'userId' })
  userId: string;

  @ApiProperty({ example: 'project1', description: 'projectId' })
  projectId: string;

  @ApiProperty({ example: 'Track description', description: 'description' })
  description: string;

  @ApiProperty({ example: false, description: 'billable' })
  billable: boolean;

  @ApiProperty({ example: 'active', description: 'state' })
  state: string;

  @ApiProperty({ example: 'type1', description: 'type' })
  type: string;

  @ApiProperty({ example: 'task1', description: 'taskIds' })
  taskIds: string;

  @ApiProperty({ example: ['tag1', 'tag2'], description: 'tagIds' })
  tagIds: string[];

  @ApiProperty({ example: [], description: 'customFields' })
  customFields: [];

  @ApiProperty({
    example: { start: '', end: null, duration: null },
    description: 'timeInterval',
  })
  timeInterval: { start: string; end: string | null; duration: number | null };
}
