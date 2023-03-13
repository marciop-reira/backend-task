import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUser } from '../../../app/use-cases/create-user';
import { GetUserAvatar } from '../../../app/use-cases/get-user-avatar';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user-view-model';
import { AvatarViewModel } from '../view-models/avatar-view-model';
import { DeleteUserAvatar } from '../../../app/use-cases/delete-user-avatar';
import { GetUserFromReqResService } from '../../../services/get-user-from-reqres/get-user-from-reqres.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendEmailService } from '../../mail/service/send-email.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private getUserFromReqRes: GetUserFromReqResService,
    private getUserAvatar: GetUserAvatar,
    private deleteUserAvatar: DeleteUserAvatar,
    private sendEmailService: SendEmailService,
    @Inject('REGISTER_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.client.connect();
    } catch (error) {}
  }

  @ApiTags('users')
  @ApiResponse({
    status: 201,
    description: 'Created',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        avatarUrl: {
          type: 'string',
        },
        createdAd: {
          type: 'datetime',
        },
      },
      example: {
        id: 'fake-id',
        email: 'fake@email.com',
        firstName: 'John',
        lastName: 'Doe',
        avatarUrl: 'images.com/avatar.ong',
        createdAd: new Date(),
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
        },
        message: {
          type: 'string',
        },
        error: {
          type: 'string',
        },
      },
      example: {
        statusCode: 400,
        message: 'Email already in use',
        error: 'Bad Request',
      },
    },
  })
  @Post()
  async create(@Body() body: CreateUserBody) {
    const { email, firstName, lastName, avatarUrl } = body;

    const { user } = await this.createUser.execute({
      email,
      firstName,
      lastName,
      avatarUrl,
    });

    this.sendEmailService.sendEmail(
      email,
      `Welcome ${firstName} ${lastName}`,
      'Your user has been created.',
    );

    this.client.emit<any>(process.env.RABBITMQ_QUEUE_NAME, user);

    return UserViewModel.toHTTP(user);
  }

  @ApiTags('users')
  @ApiResponse({
    status: 200,
    description: 'OK',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        avatarUrl: {
          type: 'datetime',
        },
      },
      example: {
        id: '1',
        email: 'george.bluth@reqres.in',
        firstName: 'George',
        lastName: 'Bluth',
        avatarUrl: 'https://reqres.in/img/faces/1-image.jpg',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
        },
        message: {
          type: 'string',
        },
      },
      example: {
        statusCode: 404,
        message: 'Not Found',
      },
    },
  })
  @Get('/:userId')
  async get(@Param('userId') userId: string) {
    const user = await this.getUserFromReqRes.getUser(userId);

    return UserViewModel.toHTTP(user);
  }

  @ApiTags('users')
  @ApiResponse({
    status: 200,
    description: 'OK',
    schema: {
      type: 'object',
      properties: {
        base64Hash: {
          type: 'string',
        },
      },
      example: {
        base64Hash: 'UAPOKkU4FIROMjv1p68...',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
        },
        message: {
          type: 'string',
        },
      },
      example: {
        statusCode: 404,
        message: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
        },
        message: {
          type: 'string',
        },
        error: {
          type: 'string',
        },
      },
      example: {
        statusCode: 400,
        message: 'Invalid avatar url',
        error: 'Bad Request',
      },
    },
  })
  @Get('/:userId/avatar')
  async getAvatar(@Param('userId') userId: string) {
    const { avatar } = await this.getUserAvatar.execute({ userId });

    return AvatarViewModel.toHTTP(avatar);
  }

  @ApiTags('users')
  @Delete('/:userId/avatar')
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
        },
        message: {
          type: 'string',
        },
      },
      example: {
        statusCode: 404,
        message: 'Not Found',
      },
    },
  })
  async deleteAvatar(@Param('userId') userId: string) {
    await this.deleteUserAvatar.execute(userId);
  }
}
