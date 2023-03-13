import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { GetUserFromReqResService } from './services/get-user-from-reqres/get-user-from-reqres.service';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMailModule } from './infra/mail/send-mail.module';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    AxiosHttpModule,
    MailerModule,
    SendMailModule,
  ],
  providers: [GetUserFromReqResService],
})
export class AppModule {}
