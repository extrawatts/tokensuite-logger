import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  LOKI_LOGGER_MODULE_OPTIONS,
  LokiLoggerModuleAsyncOptions,
  LokiLoggerModuleOptions,
  LokiLoggerModuleOptionsFactory,
} from './logger-options.interface';
import { LokiLoggerService } from './logger.service';
import { WinstonModule } from 'nest-winston';
const LokiTransport = require('winston-loki');
@Global()
@Module({
  providers: [LokiLoggerService],
})
export class LokiLoggerModule {
  static register(options: LokiLoggerModuleOptions): DynamicModule {
    // This is easy:
    return {
      module: LokiLoggerModule,
      global: true,
      imports: [
        WinstonModule.forRoot({
          transports: [
            new LokiTransport({
              host: options.host,
              basicAuth: options.basicAuth,
              json: options.json,
            }),
          ],
        }),
      ],
      exports: [LokiLoggerService],
      providers: [LokiLoggerService],
    };
  }

  static registerAsync(options: LokiLoggerModuleAsyncOptions): DynamicModule {
    // But how to import other modules here and pass in the options?
    return {
      module: LokiLoggerModule,
      imports: [
        WinstonModule.forRootAsync({
          imports: options.imports || [],
          // Factory is passed the injected CustomerInvoicesOptions as argument
          // which is based on the result of the extra providers
          useFactory: async (options: LokiLoggerModuleOptions) => ({
            transports: [
              new LokiTransport({
                host: options.host,
                basicAuth: options.basicAuth,
                json: options.json,
              }),
            ],
          }),
          inject: [LOKI_LOGGER_MODULE_OPTIONS],
        }),
      ],
      exports: [LokiLoggerService],
      providers: [LokiLoggerService, ...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(
    options: LokiLoggerModuleAsyncOptions,
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
    options: LokiLoggerModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: LOKI_LOGGER_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: LOKI_LOGGER_MODULE_OPTIONS,
      useFactory: async (optionsFactory: LokiLoggerModuleOptionsFactory) =>
        await optionsFactory.createOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
