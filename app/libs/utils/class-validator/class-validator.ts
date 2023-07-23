import { Optional } from '../../type/common-types';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { ConsoleLogger } from '@nestjs/common';

export type ClassValidationDetails = {
    context: string;
    errors: ClassValidationErrors[],
};

export type ClassValidationErrors = {
    property: string,
    message: string[]
};

export class ClassValidator {
    public static async validate<TTarget extends object>(target: TTarget, context?: string, options?: ValidatorOptions): Promise<Optional<ClassValidationDetails>> {
        let details: Optional<ClassValidationDetails>;
        const errors: ValidationError[] = await validate(target, options);

        if (errors.length > 0) {
            new ConsoleLogger().error(JSON.stringify(errors), 'CLASS VALIDATOR');
            details = {
                context: context || target.constructor.name,
                errors: []
            };
            for (const error of errors) {
                details.errors.push({
                    property: error.property,
                    message: error.constraints ? Object.values(error.constraints) : []
                });
            }
        }

        return details;
    }
}
