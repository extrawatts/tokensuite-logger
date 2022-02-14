import { DynamicModule, Module, Provider } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from './logger.service';
import { LoggerOptionsFactory, LokiLoggerAsyncOptions, LokiLoggerOptions } from './logger.module.interface';
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
  public static registerAsync(
    connectOptions: LokiLoggerAsyncOptions
  ): DynamicModule {
    return {
      module: LokiLogger,
      imports: connectOptions.imports || [],
      providers: [
        ...this.createConnectProviders(connectOptions)
      ]
    }
  }

  public static createConnectProviders(
    options: LokiLoggerAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createConnectOptionsProvider(options)]
    }

    return [
      this.createConnectOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ]
  }

  public static createConnectOptionsProvider(
    options: LokiLoggerAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: 'LOKI_LOGGER_OPTIONS',
        useFactory: options.useFactory,
        inject: options.inject || []
      }
    }

    return {
      provide: 'LOKI_LOGGER_OPTIONS',
      useFactory: async (optionsFactory: LoggerOptionsFactory) => {
        await optionsFactory.createLoggerOptions()
      },
      inject: [options.useExisting || options.useClass]
    }
  }
}
