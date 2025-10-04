import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { CORS_CONFIG } from '@/configs/cors.config';

import { AppModule } from '@/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(cookieParser());

  app.enableCors(CORS_CONFIG(config));

  const prefix = config.get<string>('PREFIX', 'api');

  app.setGlobalPrefix(prefix);

  const port = config.get<number>('PORT', 8080);

  await app.listen(port);
}
void bootstrap();
