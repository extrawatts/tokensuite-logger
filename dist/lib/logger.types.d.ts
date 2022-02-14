export interface LoggerOptions {
    host: string;
    basicAuth: string;
}
export declare enum LogJobs {
    VEHICLE = "VEHICLE",
    RIDE = "RIDE",
    PAYMENT = "PAYMENT",
    USER = "USER",
    WORKER = "WORKER",
    SYSTEM = "SYSTEM"
}
export declare enum LogServices {
    CONTROLLER = "CONTROLLER",
    PROCESSOR = "PROCESSOR",
    PAYMENT = "PAYMENT",
    COMMUNICATION = "COMMUNICATION",
    EVENT = "EVENT",
    HUB = "HUB"
}
export declare enum LogDirection {
    INCOMING = "INCOMING",
    OUTGOING = "OUTGOING"
}
export interface LogContext {
    message: string;
    labels: {
        [key: string]: any;
    } & {
        job: LogJobs;
    };
    data?: {
        [key: string]: any;
    };
    level?: LogLevel;
}
export declare enum LogLevel {
    INFO = "info",
    ERROR = "error"
}
