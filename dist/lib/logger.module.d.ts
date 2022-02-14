import { DynamicModule } from '@nestjs/common';
export declare class LokiLogger {
    static register(host: string, basicAuth: string): DynamicModule;
}
