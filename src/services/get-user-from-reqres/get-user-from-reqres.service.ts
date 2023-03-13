import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { User } from '../../app/entities/user';

@Injectable()
export class GetUserFromReqResService {
  constructor(private readonly httpService: HttpService) {}

  async getUser(userId: string): Promise<User> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${process.env.REQRES_USERS_URL}/${userId}`),
      );

      const user = new User(
        {
          email: response.data.data.email,
          firstName: response.data.data.first_name,
          lastName: response.data.data.last_name,
          avatarUrl: response.data.data.avatar,
        },
        response.data.data.id,
      );

      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
