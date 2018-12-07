import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.argv[3] || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
  });
  await app.listen(port);
}
bootstrap();
