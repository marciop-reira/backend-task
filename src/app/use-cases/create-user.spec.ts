import { BadRequestException } from '@nestjs/common';
import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { CreateUser } from './create-user';

describe('Create user', () => {
  let usersRepository: InMemoryUsersRepository;

  beforeAll(() => {
    usersRepository = InMemoryUsersRepository.getInstance();
  });

  it('should be able to create a new user', async () => {
    const createUser = new CreateUser(usersRepository);

    const { user } = await createUser.execute({
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: 'http://test.com/test-avatar.png',
    });

    expect(usersRepository.users[0]).toEqual(user);
  });

  it('should not be able to create a new user with an email already used', async () => {
    const createUser = new CreateUser(usersRepository);
    const userObject = {
      email: 'teste@test.com',
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: 'http://test.com/test-avatar.png',
    };

    await createUser.execute(userObject);

    await expect(async () => {
      return await createUser.execute(userObject);
    }).rejects.toThrow(BadRequestException);
  });
});
