import { DynamicModule, Module, Provider } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from './logger.service';
import { v4 as uuid } from 'uuid';
import { LoggerOptionsFactory, LokiLoggerAsyncOptions, LokiLoggerOptions } from './logger.module.interface';
const LokiTransport = require('winston-loki');
export const LOKI_MODULE_ID = 'LOKU_MODULE_ID';
export const LOKI_MODULE_OPTIONS = 'MULTER_MODULE_OPTIONS';
export const randomStringGenerator = () => uuid();

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
              options: {
                host: options.host,
                basicAuth: options.basicAuth,
                json: options.json
              }
            }),
          ],
        }),
      ],
    };
  }

  static async registerAsync(asyncOptions: LokiLoggerAsyncOptions): Promise<DynamicModule> {
    const optionsProvider = {
      provide: 'NotificationModuleOptions',
      useFactory: asyncOptions.useFactory,
      inject: asyncOptions.inject || [],
    };

    return {
      global: true,
      module: LokiLogger,
      providers: [LoggerService],
      exports: [LoggerService],
      imports: [
        ...asyncOptions.imports || [],
        WinstonModule.forRootAsync({
          useFactory: (options: LokiLoggerOptions) => ({
            transports: [
              new LokiTransport({
                options: {
                  host: options.host,
                  basicAuth: options.basicAuth,
                  json: options.json,
                },
              }),
            ]
          }),
          inject: [],
        }),
      ],
    };
  }
}
