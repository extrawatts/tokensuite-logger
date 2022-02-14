"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = exports.LogDirection = exports.LogServices = exports.LogJobs = void 0;
var LogJobs;
(function (LogJobs) {
    LogJobs["VEHICLE"] = "VEHICLE";
    LogJobs["RIDE"] = "RIDE";
    LogJobs["PAYMENT"] = "PAYMENT";
    LogJobs["USER"] = "USER";
    LogJobs["WORKER"] = "WORKER";
    LogJobs["SYSTEM"] = "SYSTEM";
})(LogJobs = exports.LogJobs || (exports.LogJobs = {}));
var LogServices;
(function (LogServices) {
    LogServices["CONTROLLER"] = "CONTROLLER";
    LogServices["PROCESSOR"] = "PROCESSOR";
    LogServices["PAYMENT"] = "PAYMENT";
    LogServices["COMMUNICATION"] = "COMMUNICATION";
    LogServices["EVENT"] = "EVENT";
    LogServices["HUB"] = "HUB";
})(LogServices = exports.LogServices || (exports.LogServices = {}));
var LogDirection;
(function (LogDirection) {
    LogDirection["INCOMING"] = "INCOMING";
    LogDirection["OUTGOING"] = "OUTGOING";
})(LogDirection = exports.LogDirection || (exports.LogDirection = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "info";
    LogLevel["ERROR"] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=logger.types.js.map