import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('Manga API')
  .setDescription('API documentation')
  .setVersion('1.0')
  .build();
