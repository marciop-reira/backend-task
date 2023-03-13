import { Module } from '@nestjs/common';
import { CreateUser } from '../../app/use-cases/create-user';
import { DeleteUserAvatar } from '../../app/use-cases/delete-user-avatar';
import { GetUser } from '../../app/use-cases/get-user';
import { GetUserAvatar } from '../../app/use-cases/get-user-avatar';
import { GetUserFromReqResService } from '../../services/get-user-from-reqres/get-user-from-reqres.service';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controllers/users.controller';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { SendEmailService } from '../mail/service/send-email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    AxiosHttpModule,
    ClientsModule.register([
      {
        name: 'REGISTER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_HOST],
          queue: process.env.RABBITMQ_QUEUE_NAME,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    CreateUser,
    GetUser,
    GetUserAvatar,
    DeleteUserAvatar,
    GetUserFromReqResService,
    SendEmailService,
  ],
})
export class HttpModule {}
