// Zuständigkeit: M
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  process.env.TZ = 'Europe/Berlin';

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Enable CORS for REST CrossDomain 
  app.enableCors();
  
  await app.listen(3333);
}
bootstrap();
