import { ObjectId } from 'bson';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('should be able to create an avatar', () => {
    const avatar = new Avatar({
      userId: 'fake-user-id',
      hash: 'fake-hash',
      fileName: 'fake-file-name',
    });

    expect(avatar).toMatchObject({
      userId: 'fake-user-id',
      hash: 'fake-hash',
      fileName: 'fake-file-name',
    });
    expect(ObjectId.isValid(avatar.id)).toBeTruthy();
    expect(avatar.createdAt).toBeInstanceOf(Date);
  });
});
