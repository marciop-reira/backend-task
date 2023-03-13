import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { SendEmailService } from './send-email.service';

describe('SendEmailService', () => {
  let sendEmailService: SendEmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendEmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    sendEmailService = module.get<SendEmailService>(SendEmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(sendEmailService).toBeDefined();
    expect(mailerService).toBeDefined();
  });

  describe('getUserFromReqRes', () => {
    it('should be able to send an email', async () => {
      jest.spyOn(mailerService, 'sendMail').mockImplementation(async () => {
        return {
          accepted: ['marcio2gggfgfgsd2dh2223@gma9il.com'],
          rejected: [],
          ehlo: [],
          envelopeTime: 303,
          messageTime: 249,
          messageSize: 351,
          response: '250 2.0.0 Ok: queued',
          envelope: {
            from: 'test@backendtask.com',
            to: ['marcio2gggfgfgsd2dh2223@gma9il.com'],
          },
          messageId: '<6a0d129d-5e74-309d-3e7b-eec1db55ab54@backendtask.com>',
        };
      });

      const result = await sendEmailService.sendEmail(
        'test@test.com',
        'Test Mail',
        'Test Message',
      );

      expect(result).toBeTruthy();
      expect(mailerService.sendMail).toBeCalledTimes(1);
      expect(result).toHaveProperty('accepted');
    });
  });
});
