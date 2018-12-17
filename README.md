Essboard kernel API build with [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm install
```

or

```bash
$ docker build -t essboard-kernel-api .
```

## Running the app

```bash
# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

or

```bash
# dev
$ docker run -d --env-file .env -p 3000:3000 --name essboard-kernel-service essboard-kernel-api

# for prod add environment variables (e.g. NODE_ENV = production)
```
