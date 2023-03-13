import { ObjectId } from 'bson';
import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'last',
      avatarUrl: 'http://test.com/test-avatar.png',
    });

    expect(user).toMatchObject({
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'last',
      avatarUrl: 'http://test.com/test-avatar.png',
    });
    expect(ObjectId.isValid(user.id)).toBeTruthy();
    expect(user.createdAt).toBeInstanceOf(Date);
  });
});
