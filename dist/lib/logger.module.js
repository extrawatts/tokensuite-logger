"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LokiLoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokiLoggerModule = void 0;
const common_1 = require("@nestjs/common");
const logger_options_interface_1 = require("./logger-options.interface");
const logger_service_1 = require("./logger.service");
const nest_winston_1 = require("nest-winston");
const LokiTransport = require('winston-loki');
let LokiLoggerModule = LokiLoggerModule_1 = class LokiLoggerModule {
    static register(options) {
        return {
            module: LokiLoggerModule_1,
            global: true,
            imports: [
                nest_winston_1.WinstonModule.forRoot({
                    transports: [
                        new LokiTransport({
                            host: options.host,
                            basicAuth: options.basicAuth,
                            json: options.json
                        })
                    ],
                }),
            ],
            exports: [logger_service_1.LokiLoggerService],
            providers: [logger_service_1.LokiLoggerService],
        };
    }
    static registerAsync(options) {
        return {
            module: LokiLoggerModule_1,
            imports: [
                nest_winston_1.WinstonModule.forRootAsync({
                    imports: options.imports || [],
                    useFactory: async (options) => ({
                        transports: [
                            new LokiTransport({
                                host: options.host,
                                basicAuth: options.basicAuth,
                                json: options.json
                            })
                        ]
                    }),
                    inject: [logger_options_interface_1.LOKI_LOGGER_MODULE_OPTIONS],
                }),
            ],
            exports: [logger_service_1.LokiLoggerService],
            providers: [logger_service_1.LokiLoggerService, ...this.createAsyncProviders(options)]
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass
            }
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: logger_options_interface_1.LOKI_LOGGER_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        return {
            provide: logger_options_interface_1.LOKI_LOGGER_MODULE_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createOptions(),
            inject: [options.useExisting || options.useClass]
        };
    }
};
LokiLoggerModule = LokiLoggerModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [logger_service_1.LokiLoggerService]
    })
], LokiLoggerModule);
exports.LokiLoggerModule = LokiLoggerModule;
//# sourceMappingURL=logger.module.js.map