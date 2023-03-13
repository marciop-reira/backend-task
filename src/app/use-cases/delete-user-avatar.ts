import { Injectable, NotFoundException } from '@nestjs/common';
import { AvatarsRepository } from '../repositories/avatars-repository';
import { UsersRepository } from '../repositories/users-repository';
import { removeAvatarFileFromDisk } from '../utils/remove-avatar-file-from-disk';

@Injectable()
export class DeleteUserAvatar {
  constructor(
    private avatarsRepository: AvatarsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    const avatar = await this.avatarsRepository.findByUserId(userId);

    if (avatar) {
      removeAvatarFileFromDisk(`${process.env.AVATARS_DIR}${avatar.fileName}`);
    }

    await this.avatarsRepository.delete(user.id);
  }
}
