import { Avatar } from '../../src/app/entities/avatar';
import { AvatarsRepository } from 'src/app/repositories/avatars-repository';

export class InMemoryAvatarsRepository implements AvatarsRepository {
  public avatars: Avatar[];

  private static INSTANCE: InMemoryAvatarsRepository;

  private constructor() {
    this.avatars = [];
  }

  public static getInstance(): InMemoryAvatarsRepository {
    if (!InMemoryAvatarsRepository.INSTANCE) {
      InMemoryAvatarsRepository.INSTANCE = new InMemoryAvatarsRepository();
    }

    return InMemoryAvatarsRepository.INSTANCE;
  }

  async findByUserId(userId: string): Promise<Avatar | null> {
    const avatar = this.avatars.find((item) => item.userId === userId);

    if (!avatar) {
      return null;
    }

    return avatar;
  }

  async create(avatar: Avatar): Promise<Avatar> {
    this.avatars.push(avatar);

    return avatar;
  }

  async delete(userId: string): Promise<void> {
    const avatarIndex = this.avatars.findIndex(
      (item) => item.userId === userId,
    );

    this.avatars.splice(avatarIndex, 1);
  }
}
