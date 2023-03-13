import { User } from '@prisma/client';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
    };
  }
}
