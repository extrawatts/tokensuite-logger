"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LokiLogger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokiLogger = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const logger_service_1 = require("./logger.service");
const LokiTransport = require('winston-loki');
let LokiLogger = LokiLogger_1 = class LokiLogger {
    static register(host, basicAuth) {
        return {
            module: LokiLogger_1,
            global: true,
            exports: [logger_service_1.LoggerService],
            providers: [logger_service_1.LoggerService],
            imports: [
                nest_winston_1.WinstonModule.forRoot({
                    transports: [
                        new LokiTransport({
                            host,
                            json: true,
                            basicAuth,
                        }),
                    ],
                }),
            ],
        };
    }
};
LokiLogger = LokiLogger_1 = __decorate([
    (0, common_1.Module)({})
], LokiLogger);
exports.LokiLogger = LokiLogger;
//# sourceMappingURL=logger.module.js.map