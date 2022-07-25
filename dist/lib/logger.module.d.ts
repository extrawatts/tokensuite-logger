import { DynamicModule } from "@nestjs/common";
import { LokiLoggerModuleAsyncOptions, LokiLoggerModuleOptions } from "./logger-options.interface";
export declare class LokiLoggerModule {
    static register(options: LokiLoggerModuleOptions): DynamicModule;
    static registerAsync(options: LokiLoggerModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
