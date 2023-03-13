import { InMemoryAvatarsRepository } from '../../../test/repositories/in-memory-avatars-repository';
import { makeUser } from '../../../test/factories/users-factory';
import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { GetUserAvatar } from './get-user-avatar';
import { existsSync } from 'fs';
import { removeAllAvatarsFiles } from '../utils/remove-all-avatars-files';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { avatarFileExists } from '../utils/avatar-file-exists';

describe('Get user avatar', () => {
  const usersRepository = InMemoryUsersRepository.getInstance();
  const avatarsRepository = InMemoryAvatarsRepository.getInstance();
  const getUserAvatar = new GetUserAvatar(avatarsRepository, usersRepository);

  it('should be able to download and get user avatar on first request', async () => {
    const generatedUser = makeUser();

    await usersRepository.create(generatedUser);
    const { avatar } = await getUserAvatar.execute({
      userId: generatedUser.id,
    });

    expect(avatar.hash).toBeDefined();
    expect(
      existsSync(`${process.env.AVATARS_DIR}${avatar.fileName}`),
    ).toBeTruthy();
  });

  it('should not be able to download avatar from a invalid url', async () => {
    const user = makeUser({
      avatarUrl: 'invalid-avatar-url',
    });
    await usersRepository.create(user);

    await expect(() => {
      return getUserAvatar.execute({ userId: user.id });
    }).rejects.toThrow(BadRequestException);
  });

  it('should not be able to get avatar from a non-existent user', async () => {
    await expect(() => {
      return getUserAvatar.execute({ userId: 'fake-user-id' });
    }).rejects.toThrow(NotFoundException);
  });

  it('should be able to get user avatar after first request without downloading it again', async () => {
    const user = makeUser();
    await usersRepository.create(user);

    await getUserAvatar.execute({
      userId: user.id,
    });
    const { avatar } = await getUserAvatar.execute({
      userId: user.id,
    });

    expect(avatarFileExists(avatar.fileName)).toBeTruthy();
    expect(
      existsSync(`${process.env.AVATARS_DIR}${avatar.fileName}`),
    ).toBeTruthy();
  });

  afterAll(removeAllAvatarsFiles);
});
