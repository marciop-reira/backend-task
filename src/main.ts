import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Backend Task Documentation')
    .setDescription('The backend task api documentation')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/doc', app, document);

  await app.listen(3001);
}
bootstrap();
