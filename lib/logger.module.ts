import { DynamicModule, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from './logger.service';
import { LokiLoggerAsyncOptions, LokiLoggerOptions } from './logger.module.interface';
const LokiTransport = require('winston-loki');

@Module({})
export class LokiLogger {
  static register(options: LokiLoggerOptions): DynamicModule {
    return {
      module: LokiLogger,
      global: true,
      exports: [LoggerService],
      providers: [LoggerService],
      imports: [
        WinstonModule.forRoot({
          transports: [
            new LokiTransport({
              options
            }),
          ],
        }),
      ],
    };
  }
  static registerAsync(options: LokiLoggerAsyncOptions): DynamicModule {
    return {
      module: LokiLogger,
      global: true,
      exports: [LoggerService],
      providers: [LoggerService],
      imports: [
        WinstonModule.forRoot({
          transports: [
            new LokiTransport({
              options
            }),
          ],
        }),
      ],
    };
  }
}
