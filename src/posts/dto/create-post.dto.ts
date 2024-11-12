import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Post title', description: 'Post title' })
  readonly title: string;
  @ApiProperty({ example: 'Post content', description: 'Post content' })
  readonly content: string;
  @ApiProperty({ example: '8', description: 'User id' })
  readonly userId: number;
}
