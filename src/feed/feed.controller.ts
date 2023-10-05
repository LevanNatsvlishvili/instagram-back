import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeedService } from './feed.service';
import { CreateCommentDto, CreatePostDto, CreateStoryDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class FeedController {
  constructor(private readonly postsService: FeedService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Post(':postId/comments')
  createComment(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postsService.createComment(postId, createCommentDto.content);
  }

  @Post('stories')
  createStory(@Body() createStoryDto: CreateStoryDto) {
    return this.postsService.createStory(createStoryDto);
  }

  @Get('stories')
  getStories() {
    return this.postsService.getStories();
  }
}
