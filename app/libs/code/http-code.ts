import { CodeStructure } from "../type/common-types"

export class HttpCode {
    public static OK: CodeStructure = {
        code: 200,
        message: "Success."
    }

    public static CREATED: CodeStructure = {
        code: 201,
        message: "Created."
    }

    public static BAD_REQUEST_ERROR: CodeStructure = {
        code: 400,
        message: 'Bad request.'
    };

    public static UNAUTHORIZED_ERROR: CodeStructure = {
        code: 401,
        message: 'Unauthorized error.'
    };

    public static INTERNAL_ERROR: CodeStructure = {
        code: 500,
        message: 'Internal error.'
    };

    public static ENTITY_VALIDATION_ERROR: CodeStructure = {
        code: 1001,
        message: 'Entity validation error.'
    };

    public static FORBIDDEN: CodeStructure = {
        code: 403,
        message: 'Forbidden.'
    };
}