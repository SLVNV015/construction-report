import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const logger = new Logger('Bootstrap');

  const config = new DocumentBuilder()
    .setTitle('Construction Report API')
    .setDescription('API для журнала операций на стройке')
    .setVersion('1.0')
    .addTag('operations', 'Операции на стройке')
    .addTag('work-types', 'Виды работ')
    .addTag('health', 'Health check')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableShutdownHooks();
  process.on('uncaughtException', async (error) => {
    logger.error('Uncaught Exception', error);
    await gracefulExit(app, logger);
  });

  process.on('unhandledRejection', async (error) => {
    logger.error('Unhandled Rejection', error);
    await gracefulExit(app, logger);
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  Logger.log(
    `📚 Swagger documentation: http://localhost:${port}/${globalPrefix}/docs`,
  );
}

bootstrap();

async function gracefulExit(app: any, logger: Logger) {
  logger.warn('Инициировано экстренное завершение работы приложения...');

  const emergencyTimeout = setTimeout(() => {
    logger.error(
      'Принудительный выход по таймауту! NestJS не смог закрыться вовремя.',
    );
    process.exit(1);
  }, 20000);

  emergencyTimeout.unref();
  try {
    await app.close();

    clearTimeout(emergencyTimeout);

    logger.log('Приложение успешно остановлено. Выход.');
    process.exit(1);
  } catch (error) {
    logger.error('Ошибка при корректном закрытии приложения:', error);
    process.exit(1);
  }
}
