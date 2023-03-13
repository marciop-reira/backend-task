import { BadRequestException, Injectable } from '@nestjs/common';
import { Avatar } from 'src/app/entities/avatar';
import { AvatarsRepository } from 'src/app/repositories/avatars-repository';
import { PrismaAvatarMapper } from '../mappers/prisma-avatar-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAvatarsRepository implements AvatarsRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Avatar | null> {
    const avatar = await this.prisma.avatar.findUnique({
      where: {
        userId,
      },
    });

    if (!avatar) {
      return null;
    }

    return PrismaAvatarMapper.toDomain(avatar);
  }

  async create(avatar: Avatar): Promise<Avatar> {
    const raw = PrismaAvatarMapper.toPrisma(avatar);

    await this.prisma.avatar.create({
      data: raw,
    });

    return avatar;
  }

  async delete(userId: string): Promise<void> {
    try {
      await this.prisma.avatar.delete({
        where: {
          userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Avatar does not exists');
    }
  }
}
