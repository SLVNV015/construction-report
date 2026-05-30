import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ShutdownDbService implements OnApplicationShutdown {
  constructor(private readonly _datasource: DataSource) {}
  private readonly _logger = new Logger();

  async onApplicationShutdown() {
    this._logger.log('Shutting down signal received');

    if (this._datasource.isInitialized) {
      try {
        await this._datasource.destroy();
        this._logger.log('Database connection closed');
      } catch (err) {
        this._logger.error('Error closing database connection', err);
      }
    }
  }
}
