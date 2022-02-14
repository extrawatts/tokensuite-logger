export interface LoggerOptions {
  host: string;
  basicAuth: string;
}

export enum LogJobs {
  VEHICLE = 'VEHICLE',
  RIDE = 'RIDE',
  PAYMENT = 'PAYMENT',
  USER = 'USER',
  WORKER = 'WORKER',
  SYSTEM = 'SYSTEM',
}

export enum LogServices {
  CONTROLLER = 'CONTROLLER',
  PROCESSOR = 'PROCESSOR',
  PAYMENT = 'PAYMENT',
  COMMUNICATION = 'COMMUNICATION',
  EVENT = 'EVENT',
  HUB = 'HUB',
}

export enum LogDirection {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
}

export interface LogContext {
  /**
   * Logger Message
   */
  message: string;

  /**
   * Labels for search
   */
  labels: { [key: string]: any } & {
    job: LogJobs;
  };

  /**
   * Message replacement data
   */
  data?: { [key: string]: any };

  /**
   * Log Level
   */
  level?: LogLevel;
}

export enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
}
