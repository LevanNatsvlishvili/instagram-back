import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: { imageUrl: string; caption?: string }) {
    return this.prisma.post.create({
      data,
    });
  }

  async getPosts() {
    return this.prisma.post.findMany({
      include: {
        comments: true,
      },
    });
  }

  async createComment(postId: number, content: string) {
    return this.prisma.comment.create({
      data: {
        content,
        postId,
      },
    });
  }

  async createStory(data: { imageUrl: string }) {
    return this.prisma.story.create({
      data,
    });
  }

  async getStories() {
    return this.prisma.story.findMany({});
  }
}
