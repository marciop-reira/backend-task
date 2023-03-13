import { Avatar } from '@prisma/client';

export class AvatarViewModel {
  static toHTTP(avatar: Avatar) {
    return {
      base64Hash: avatar.hash,
    };
  }
}
