import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AbstractResponse } from './../api/abstract-response';
import { ExecutionContextToAbstractResponsePipe } from './../pipe/ctx-to-abstract-response.pipe';

const GetExecutionContext = createParamDecorator(
  (_: never, ctx: ExecutionContext): ExecutionContext => ctx
);

export const GenericResponse = (): ParameterDecorator =>
  GetExecutionContext(ExecutionContextToAbstractResponsePipe);

export type GenericResponse = AbstractResponse;
