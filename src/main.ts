import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;
const cors = process.env.CORS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: cors,
  });
  await app.listen(port);
}
bootstrap();
