import { Avatar } from '../../src/app/entities/avatar';
import { InMemoryAvatarsRepository } from './in-memory-avatars-repository';

describe('AvatarsRepository', () => {
  let avatarsRepository: InMemoryAvatarsRepository;
  const avatarObjectExample = {
    userId: 'fake-user-id',
    hash: 'fake-hash',
    fileName: 'fake-file-name',
  };

  beforeAll(() => {
    avatarsRepository = InMemoryAvatarsRepository.getInstance();
  });

  it('should be able to create a new avatar', async () => {
    const avatar = await avatarsRepository.create(
      new Avatar(avatarObjectExample),
    );

    expect(avatar).toMatchObject(avatarObjectExample);
    expect(avatar.createdAt).toBeInstanceOf(Date);
  });

  it('should be able to find avatar by user id', async () => {
    const avatar = await avatarsRepository.create(
      new Avatar(avatarObjectExample),
    );
    const findUser = await avatarsRepository.findByUserId(avatar.userId);

    expect(findUser).toMatchObject(avatarObjectExample);
  });

  it('should be able to delete an avatar by user id', async () => {
    const userId = 'fake-user-id-2';

    await avatarsRepository.create(
      new Avatar({
        userId,
        hash: 'fake-hash-2',
        fileName: 'fake-file-name',
      }),
    );
    await avatarsRepository.delete(userId);

    const findUser = await avatarsRepository.findByUserId(userId);

    expect(findUser).toBeNull();
  });
});
