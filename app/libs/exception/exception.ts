import { CodeStructure } from "../type/common-types"
import { Optional } from '../type/common-types';

export type CreateExceptionPayload<TData> = {
    code: CodeStructure,
    overrideMessage?: string,
    data?: TData | string,
};

export class Exception<TData> extends Error {

    public readonly code: number;

    public readonly data: Optional<TData | string>;

    private constructor(codeStructure: CodeStructure, overrideMessage?: string, data?: TData | string) {
        super();
        this.name = this.constructor.name;
        this.code = codeStructure.code;
        this.data = data || codeStructure.message;
        this.message = overrideMessage || codeStructure.message;

        Error.captureStackTrace(this, this.constructor);
    }

    public static new<TData>(payload: CreateExceptionPayload<TData>): Exception<TData> {
        return new Exception(payload.code, payload.overrideMessage, payload.data);
    }

}