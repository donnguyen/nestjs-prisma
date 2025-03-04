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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const client_1 = require("@prisma/client");
let PrismaClientExceptionFilter = class PrismaClientExceptionFilter extends core_1.BaseExceptionFilter {
    constructor(applicationRef, errorCodesStatusMapping = null) {
        super(applicationRef);
        this.errorCodesStatusMapping = {
            P2000: common_1.HttpStatus.BAD_REQUEST,
            P2002: common_1.HttpStatus.CONFLICT,
            P2025: common_1.HttpStatus.NOT_FOUND,
        };
        if (errorCodesStatusMapping) {
            this.errorCodesStatusMapping = Object.assign(this.errorCodesStatusMapping, errorCodesStatusMapping);
        }
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
            return super.catch(exception, host);
        }
        const statusCode = this.errorCodesStatusMapping[exception.code];
        const message = `[${exception.code}]: ` + this.exceptionShortMessage(exception.message);
        response.status(statusCode).send(JSON.stringify({
            statusCode,
            message,
        }));
    }
    exceptionShortMessage(message) {
        const shortMessage = message.substring(message.indexOf('→'));
        return shortMessage
            .substring(shortMessage.indexOf('\n'))
            .replace(/\n/g, '')
            .trim();
    }
};
PrismaClientExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma === null || client_1.Prisma === void 0 ? void 0 : client_1.Prisma.PrismaClientKnownRequestError),
    __metadata("design:paramtypes", [Object, Object])
], PrismaClientExceptionFilter);
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter;
//# sourceMappingURL=prisma-client-exception.filter.js.map