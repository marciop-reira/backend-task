import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';

interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, firstName, lastName, avatarUrl } = request;
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new BadRequestException('Email already in use');
    }

    const user = new User({
      email,
      firstName,
      lastName,
      avatarUrl,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
