import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import type { ConfigService } from '@nestjs/config';

export const CORS_CONFIG = (configService: ConfigService): CorsOptions => {
  const allowedOrigins = configService.getOrThrow<string>('ALLOWED_ORIGINS').split(',');

  return {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  };
};
