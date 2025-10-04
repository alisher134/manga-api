import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { CORS_CONFIG } from '@/configs/cors.config';
import { SWAGGER_CONFIG } from '@/configs/swagger.config';

import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(cookieParser());

  app.enableCors(CORS_CONFIG(config));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const prefix = config.get<string>('PREFIX', 'api');

  app.setGlobalPrefix(prefix);

  const port = config.get<number>('PORT', 8080);

  const document = () => SwaggerModule.createDocument(app, SWAGGER_CONFIG);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
}
void bootstrap();
