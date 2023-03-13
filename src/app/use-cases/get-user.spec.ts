import { NotFoundException } from '@nestjs/common';
import { makeUser } from '../../../test/factories/users-factory';
import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { GetUser } from './get-user';

describe('Get a user', () => {
  const usersRepository = InMemoryUsersRepository.getInstance();

  it('should be able to list a user', async () => {
    const getUser = new GetUser(usersRepository);
    const generatedUser = makeUser();

    await usersRepository.create(generatedUser);

    const data = await getUser.execute({
      userId: generatedUser.id,
    });

    expect(data.user).toEqual(generatedUser);
  });

  it('should not be able to list a non-existent user', async () => {
    const getUser = new GetUser(usersRepository);

    expect(() => {
      return getUser.execute({
        userId: 'fake-user-id',
      });
    }).rejects.toThrow(NotFoundException);
  });
});
