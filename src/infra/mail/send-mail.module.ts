import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SendEmailService } from './service/send-email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        port: +process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        ignoreTLS: true,
      },
    }),
  ],
  controllers: [],
  providers: [SendEmailService],
})
export class SendMailModule {}
