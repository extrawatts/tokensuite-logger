import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { LoggerOptions } from './logger-options.interface';
export declare type LokiLoggerOptions = LoggerOptions;
export interface LoggerOptionsFactory {
    createLoggerOptions(): Promise<LokiLoggerOptions> | LokiLoggerOptions;
}
export interface LokiLoggerAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<LoggerOptionsFactory>;
    useClass?: Type<LoggerOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<LokiLoggerOptions> | LokiLoggerOptions;
    inject?: any[];
}