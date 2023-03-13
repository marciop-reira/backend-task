import { User, UserProps } from '../../src/app/entities/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    email: 'test@test.com',
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: 'https://github.com/marciop-reira.png',
    ...override,
  });
}
