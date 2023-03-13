import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/infra/database/prisma/prisma.service';
import { removeAllAvatarsFiles } from '../src/app/utils/remove-all-avatars-files';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let createdUserId: string;
  const createUserBody = {
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'Test',
    avatarUrl: 'https://github.com/marciop-reira.png',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const prisma = new PrismaService();

    const deleteAvatar = prisma.avatar.deleteMany();
    const deleteUser = prisma.user.deleteMany();

    await prisma.$transaction([deleteAvatar, deleteUser]);
    await prisma.$disconnect();

    removeAllAvatarsFiles();
  });

  describe('[POST] /api/users', () => {
    it('should be able to create a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserBody)
        .expect(201);

      expect(response.body).toEqual({
        id: expect.any(String),
        ...createUserBody,
      });

      createdUserId = response.body.id;
    });

    it('should not be able to create new users when email is already taken', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserBody)
        .expect(400);

      expect(response.body.error).toBeTruthy();
    });
  });

  describe('[GET] /api/users/{userId}', () => {
    it('should be able to get a user by id', async () => {
      const userId = 1;
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toEqual(`${userId}`);
    });

    it('should not be able to get a non-existent user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/invalid-user-id`)
        .expect(404);

      expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
      expect(response.body.message).toBeTruthy();
    });
  });

  describe('[GET] /api/users/{userId}/avatar', () => {
    it('should be able to get an avatar by user id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${createdUserId}/avatar`)
        .expect(200);

      expect(response.body.base64Hash).toBeTruthy();
    });

    it('should not be able to get an avatar from a invalid url', async () => {
      const response = await request(app.getHttpServer())
        .post(`/users`)
        .send({
          avatarUrl: 'invalid.url',
          ...createUserBody,
        })
        .expect(400);

      expect(response.body.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toBeTruthy();
    });

    it('should not be able to get avatar from a non-existent user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/invalid-user-id`)
        .expect(404);

      expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
      expect(response.body.message).toBeTruthy();
    });
  });

  describe('[DELETE] /api/users/{userId}/avatar', () => {
    it('should be able to delete an avatar by user id', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${createdUserId}/avatar`)
        .expect(200);
    });

    it('should not be able to delete an avatar from a non-existent user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/users/invalid-user-id`)
        .expect(404);

      expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
      expect(response.body.message).toBeTruthy();
    });
  });
});
