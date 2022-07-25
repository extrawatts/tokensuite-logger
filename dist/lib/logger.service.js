"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokiLoggerService = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const logger_types_1 = require("./logger.types");
let LokiLoggerService = class LokiLoggerService {
    constructor(logger) {
        this.logger = logger;
    }
    replace(message, data) {
        for (const key in data)
            message = message.replace(`%${key}`, data[key]);
        return message;
    }
    write(context) {
        const message = context.data
            ? this.replace(context.message, context.data)
            : context.message;
        this.logger.log(context.level || logger_types_1.LogLevel.INFO, message, {
            labels: context.labels,
        });
    }
};
LokiLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [common_1.Logger])
], LokiLoggerService);
exports.LokiLoggerService = LokiLoggerService;
//# sourceMappingURL=logger.service.js.map