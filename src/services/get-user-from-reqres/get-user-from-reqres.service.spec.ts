import { HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { User } from '../../app/entities/user';
import { GetUserFromReqResService } from '../get-user-from-reqres/get-user-from-reqres.service';

describe('GetUserFromReqResService', () => {
  let getUserReqResService: GetUserFromReqResService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserFromReqResService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    getUserReqResService = module.get<GetUserFromReqResService>(
      GetUserFromReqResService,
    );
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(getUserReqResService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('getUserFromReqRes', () => {
    it('should be able to get user by id from reqres api', async () => {
      const userIdExample = '1';

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          status: 200,
          config: {},
          statusText: '',
          headers: {},
          data: {
            data: {
              id: 1,
              email: 'george.bluth@reqres.in',
              first_name: 'George',
              last_name: 'Bluth',
              avatar: 'https://reqres.in/img/faces/1-image.jpg',
            },
            support: {
              url: 'https://reqres.in/#support-heading',
              text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
            },
          },
        }) as Observable<AxiosResponse>,
      );

      const result = await getUserReqResService.getUser(userIdExample);

      expect(result).toBeTruthy();
      expect(httpService.get).toBeCalledTimes(1);
      expect(result).toBeInstanceOf(User);
    });

    it('should be able to get a non-existent user', async () => {
      const userIdExample = 'fake-user-if';

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          status: 404,
          config: {},
          statusText: '',
          headers: {},
          data: {},
        }) as Observable<AxiosResponse>,
      );

      expect(async () => {
        await getUserReqResService.getUser(userIdExample);
      }).rejects.toThrow(NotFoundException);
    });
  });
});
