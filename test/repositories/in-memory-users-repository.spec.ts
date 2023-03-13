import { ObjectId } from 'bson';
import { User } from '../../src/app/entities/user';
import { InMemoryUsersRepository } from './in-memory-users-repository';

describe('UsersRepository', () => {
  let usersRepository: InMemoryUsersRepository;
  const userObjectExample = {
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'last',
    avatarUrl: 'http://test.com/test-avatar.png',
  };

  beforeAll(() => {
    usersRepository = InMemoryUsersRepository.getInstance();
  });

  it('should be able to create a new user', async () => {
    const user = await usersRepository.create(new User(userObjectExample));

    expect(user).toMatchObject(userObjectExample);
    expect(ObjectId.isValid(user.id)).toBe(true);
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('should be able to find user by id', async () => {
    const user = await usersRepository.create(new User(userObjectExample));
    const findUser = await usersRepository.findById(user.id);

    expect(findUser).toMatchObject(userObjectExample);
  });

  it('should be able to find user by email', async () => {
    const findUser = await usersRepository.findByEmail(userObjectExample.email);

    expect(findUser).toMatchObject(userObjectExample);
  });
});
