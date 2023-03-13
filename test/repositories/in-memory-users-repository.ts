import { User } from 'src/app/entities/user';
import { UsersRepository } from 'src/app/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[];

  private static INSTANCE: InMemoryUsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): InMemoryUsersRepository {
    if (!InMemoryUsersRepository.INSTANCE) {
      InMemoryUsersRepository.INSTANCE = new InMemoryUsersRepository();
    }

    return InMemoryUsersRepository.INSTANCE;
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }
}
