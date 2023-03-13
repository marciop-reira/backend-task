import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';
import { UsersRepository } from 'src/app/repositories/users-repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: raw,
    });

    return user;
  }
}
