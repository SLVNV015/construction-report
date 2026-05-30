import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Operation } from './entities/operation.entity';
import { WorkType } from './entities/work-type.entity';
import { OperationsController } from './controllers/operations.controller';
import { WorkTypesController } from './controllers/work-types.controller';
import { HealthController } from './controllers/health.controller';
import { OperationsService } from './services/operations.service';
import { WorkTypesService } from './services/work-types.service';
import { ShutdownDbService } from './services/shutdown.db.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST') || 'localhost',
        port: config.get<number>('DB_PORT') || 5432,
        username: config.get('DB_USERNAME') || 'postgres',
        password: config.get('DB_PASSWORD') || 'postgres',
        database: config.get('DB_DATABASE') || 'construction_report',
        entities: [Operation, WorkType],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Operation, WorkType]),
  ],
  controllers: [OperationsController, WorkTypesController, HealthController],
  providers: [OperationsService, WorkTypesService, ShutdownDbService],
})
export class AppModule {}
