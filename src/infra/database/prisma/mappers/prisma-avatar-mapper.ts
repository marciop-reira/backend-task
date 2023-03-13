import { Avatar as RawAvatar } from '@prisma/client';
import { Avatar } from '../../../../app/entities/avatar';

export class PrismaAvatarMapper {
  static toPrisma(avatar: Avatar) {
    return {
      id: avatar.id,
      userId: avatar.userId,
      hash: avatar.hash,
      fileName: avatar.fileName,
    };
  }

  static toDomain(raw: RawAvatar): Avatar {
    return new Avatar({
      userId: raw.userId,
      hash: raw.hash,
      fileName: raw.fileName,
      createdAt: raw.createdAt,
    });
  }
}
