import { ForbiddenException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';

@Injectable()
export class authService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDTO) {
    try {
      const hashPass = await hash(dto.password);

      const user = await this.prisma.users.create({
        data: {
          email: dto.email,
          hash: hashPass,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
      throw e;
    }
  }
  login() {
    return 'Logged in';
  }
}
