import { User as RawUser } from '@prisma/client';
import { User } from '../../../../app/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        email: raw.email,
        firstName: raw.firstName,
        lastName: raw.lastName,
        avatarUrl: raw.avatarUrl,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
