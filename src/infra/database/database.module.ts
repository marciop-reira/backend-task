import { Module } from '@nestjs/common';
import { AvatarsRepository } from '../../app/repositories/avatars-repository';
import { UsersRepository } from '../../app/repositories/users-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAvatarsRepository } from './prisma/repositories/prisma-avatar-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: AvatarsRepository,
      useClass: PrismaAvatarsRepository,
    },
  ],
  exports: [UsersRepository, AvatarsRepository],
})
export class DatabaseModule {}
