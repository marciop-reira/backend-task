# Backend Task

## Content Table

- [Backend Task](#backend-task)
  - [About The Project](#about-the-project)
    - [Techs](#techs)
  - [Installation](#installation)
    - [Setup Docker](#setup-docker)
    - [Setup Database](#setup-database)
    - [Running Tests](#running-tests)
  - [Running the app](#running-the-app)
  - [Api Documentation](#api-documentation)
  - [Stay in touch](#stay-in-touch)
  - [License](#license)
  
## About The Project

### Techs
- [NestJS Framework](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Docker](https://www.docker.com/)
- [Swagger](https://zircote.github.io/swagger-php/)
  
## Installation

### Setup Docker

Copy .env.example
```sh
cp .env.example .env
```

Update .env (To test sending email you can use [Mailtrap](https://mailtrap.io/))
```dosini
AVATARS_DIR=./public/avatars/
DATABASE_URL="mongodb://root:prisma@localhost:27017/backend-task?authSource=admin"
REQRES_USERS_URL=https://reqres.in/api/users
MAIL_USER=
MAIL_PASS=
MAIL_HOST=
MAIL_PORT=
MAIL_FROM=test@backendtask.com
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=admin
RABBITMQ_HOST=amqp://admin:admin@localhost:5672
RABBITMQ_QUEUE_NAME=user_created
```
Up project containers
```sh
docker-compose up -d
```

### Setup Database

Create collections on mongodb
```bash
$ npm run prisma
```

### Running Tests

Unit tests
```bash
$ npm run test
```

E2E tests
```bash
$ npm run test:e2e
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Api Documentation

[http://localhost:3001/api/doc](http://localhost:3001/api/doc)

## Stay in touch

- Author - [Márcio Pereira](mailto://marciop.usa@gmail.com)
- Website - [https://github.com/marciop-reira](https://github.com/marciop-reira/)


## License

[MIT licensed](LICENSE).
