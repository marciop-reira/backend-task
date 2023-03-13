import { InMemoryAvatarsRepository } from '../../../test/repositories/in-memory-avatars-repository';
import { makeUser } from '../../../test/factories/users-factory';
import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { DeleteUserAvatar } from './delete-user-avatar';
import { GetUserAvatar } from './get-user-avatar';
import { removeAllAvatarsFiles } from '../utils/remove-all-avatars-files';
import { avatarFileExists } from '../utils/avatar-file-exists';
import { NotFoundException } from '@nestjs/common';

describe('Delete a user avatar', () => {
  const avatarsRepository = InMemoryAvatarsRepository.getInstance();
  const usersRepository = InMemoryUsersRepository.getInstance();
  const deleteUserAvatar = new DeleteUserAvatar(
    avatarsRepository,
    usersRepository,
  );
  const getUserAvatar = new GetUserAvatar(avatarsRepository, usersRepository);

  it('should be able to delete a user avatar', async () => {
    const user = makeUser();

    await usersRepository.create(user);
    const { avatar } = await getUserAvatar.execute({ userId: user.id });
    await deleteUserAvatar.execute(user.id);

    expect(avatarFileExists(avatar.fileName)).toBeFalsy();
    expect(await avatarsRepository.findByUserId(user.id)).toBeNull();
  });

  it('should not be able to delete avatar from a non-existent user', async () => {
    await expect(async () => {
      return await deleteUserAvatar.execute('fake-user-id');
    }).rejects.toThrow(NotFoundException);
  });

  afterAll(removeAllAvatarsFiles);
});
