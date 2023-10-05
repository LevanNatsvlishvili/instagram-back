import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsOptional()
  caption?: string;
}

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  // @IsDate()
  // @IsNotEmpty()
  // expiresAt: Date;
}
