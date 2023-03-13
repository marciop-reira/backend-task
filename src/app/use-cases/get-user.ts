import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';

interface GetUserRequest {
  userId: string;
}

interface GetUserResponse {
  user: User;
}

@Injectable()
export class GetUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const { userId } = request;
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return {
      user,
    };
  }
}
