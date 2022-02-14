import { ModuleMetadata, Type } from "@nestjs/common";

export const LOKI_LOGGER_MODULE_OPTIONS = "LOKI_LOGGER_MODULE_OPTIONS";

export interface LokiLoggerModuleOptions {
  host: string;
  basicAuth: string;
  json?: boolean;
}

export interface LokiLoggerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<LokiLoggerModuleOptionsFactory>;
  useClass?: Type<LokiLoggerModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<LokiLoggerModuleOptions> | LokiLoggerModuleOptions;
  inject?: any[];
}

export interface LokiLoggerModuleOptionsFactory {
  createOptions(): Promise<LokiLoggerModuleOptions> | LokiLoggerModuleOptions;
}