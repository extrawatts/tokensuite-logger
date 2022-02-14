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
      imports: new LokiTransport({
        options
      }),
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: LOKI_MODULE_ID,
          useValue: randomStringGenerator(),
        },
      ],
      exports: [LOKI_MODULE_OPTIONS],
    };
  }
  private static createAsyncProviders(
    options: LokiLoggerAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: LokiLoggerAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: LOKI_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: LOKI_MODULE_OPTIONS,
      useFactory: async (optionsFactory: LoggerOptionsFactory) =>
        optionsFactory.createLoggerOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
