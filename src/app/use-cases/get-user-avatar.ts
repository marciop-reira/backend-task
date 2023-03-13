import { Injectable, NotFoundException } from '@nestjs/common';
import { Avatar } from '../entities/avatar';
import { AvatarsRepository } from '../repositories/avatars-repository';
import { UsersRepository } from '../repositories/users-repository';
import { downloadAvatarFromUrl } from '../utils/download-avatar-from-url';

interface GetUserAvatarRequest {
  userId: string;
}

interface GetUserAvatarResponse {
  avatar: Avatar;
}

@Injectable()
export class GetUserAvatar {
  constructor(
    private avatarsRepository: AvatarsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: GetUserAvatarRequest): Promise<GetUserAvatarResponse> {
    const { userId } = request;
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let avatar = await this.avatarsRepository.findByUserId(userId);
    if (!avatar) {
      const { hash, fileName } = await downloadAvatarFromUrl(user.avatarUrl);

      avatar = new Avatar({
        userId,
        hash,
        fileName,
      });

      this.avatarsRepository.create(avatar);
    }

    return { avatar };
  }
}
