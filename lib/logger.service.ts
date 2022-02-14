import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { LogContext, LogLevel } from './logger.types';

// logMessages[name]

@Injectable()
export class LokiLoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  /**
   * Replace variables
   *
   * @param message
   * @param data
   *
   * @returns {string}
   */
  replace(message: string, data: { [key: string]: any }): string {
    for (const key in data) message = message.replace(`%${key}`, data[key]);

    return message;
  }

  /**
   * Send command to logger
   *
   * @param context
   */
  write(context: LogContext) {
    // Send contet to logger
    const message = context.data
      ? this.replace(context.message, context.data)
      : context.message;

    this.logger.log(context.level || LogLevel.INFO, message, {
      labels: context.labels,
    });
  }
}
