import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class SendEmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(
    email: string,
    subject: string,
    message: string,
  ): Promise<SentMessageInfo> {
    try {
      return await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_FROM,
        subject: subject,
        html: message,
      });
    } catch (error) {}
  }
}
