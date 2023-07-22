import type { ExecutionContext } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

export class AbstractResponse {
  httpCtx: HttpArgumentsHost;

  constructor(
    private readonly httpAdapter: AbstractHttpAdapter,
    readonly executionContext: ExecutionContext
  ) {
    this.httpCtx = executionContext.switchToHttp();
  }

  /** Define the HTTP header on the response object. */
  setHeader(name: string, value: string): this {
    this.httpAdapter.setHeader(this.httpCtx.getResponse(), name, value);
    return this;
  }

  /** Define the HTTP status code on the response object. */
  setStatus(statusCode: number): this {
    this.httpAdapter.status(this.httpCtx.getResponse(), statusCode);
    return this;
  }
}