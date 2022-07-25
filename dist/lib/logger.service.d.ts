import { Logger } from '@nestjs/common';
import { LogContext } from './logger.types';
export declare class LokiLoggerService {
    private readonly logger;
    constructor(logger: Logger);
    replace(message: string, data: {
        [key: string]: any;
    }): string;
    write(context: LogContext): void;
}
