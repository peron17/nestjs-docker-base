import { PageMetaDto } from "apps/api/src/core/typeorm/dtos/page-meta.dto";
import { Nullable } from "../type/common-types";
import { HttpCode } from "../code/http-code";

export class ApiResponse<TData> {
    /**
     * status {
     *      code: 
     *      message:
     * },
     * data [
     *      {},
     *      {},
     *      ...
     * ],
     * meta {
     *      pagination: {}, (optional)
     *      timestamps: timestamp
     * }
     */
    public readonly status: object;

    public readonly data: Nullable<TData>;

    public readonly meta: object;

    private constructor(code: number, message: string, data?: TData, meta?: object, pagination?: PageMetaDto) {
        this.status = {
            code: code,
            message: message,
        }
        
        this.data = data || null;

        let metas: any = { timestamp: Date.now() };
        if (pagination) {
            metas = { ...metas, ...{ pagination: pagination } }
        }
        if (meta) {
            metas = { ...metas, ...meta }
        }
        this.meta = metas;
    }

    public static success<TData>(data?: TData, pagination?: PageMetaDto, meta?: {}): ApiResponse<TData> {
        return new ApiResponse(HttpCode.OK.code, HttpCode.OK.message, data, meta, pagination);
    }

    public static created<TData>(data?: TData): ApiResponse<TData> {
        return new ApiResponse(HttpCode.CREATED.code, HttpCode.CREATED.message, data);
    }

    public static error<TData>(code?: number, message?: string, data?: TData): ApiResponse<TData> {
        const resultCode: number = code || HttpCode.INTERNAL_ERROR.code;
        const resultMessage: string = message || HttpCode.INTERNAL_ERROR.message;

        return new ApiResponse(resultCode, resultMessage, data);
    }

}