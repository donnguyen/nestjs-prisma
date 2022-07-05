import { ArgumentsHost, HttpServer } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
export declare type ErrorCodesStatusMapping = {
    [key: string]: number;
};
export declare class PrismaClientExceptionFilter extends BaseExceptionFilter {
    private errorCodesStatusMapping;
    constructor(applicationRef?: HttpServer, errorCodesStatusMapping?: ErrorCodesStatusMapping);
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void;
    exceptionShortMessage(message: string): string;
}
