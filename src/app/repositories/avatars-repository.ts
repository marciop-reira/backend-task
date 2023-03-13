import { Avatar } from '../entities/avatar';

export abstract class AvatarsRepository {
  abstract findByUserId(userId: string): Promise<Avatar | null>;
  abstract create(avatar: Avatar): Promise<Avatar>;
  abstract delete(userId: string): Promise<void>;
}
