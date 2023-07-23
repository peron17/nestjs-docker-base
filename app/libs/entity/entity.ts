import { HttpCode } from '../code/http-code';
import { Exception } from '../exception/exception';
import { Optional } from '../type/common-types';
import { HttpException, Logger } from "@nestjs/common";
import { ClassValidationDetails, ClassValidator } from '../utils/class-validator/class-validator';

export class Entity<TIdentifier extends string | bigint > {

    protected id: Optional<TIdentifier>;

    public getId(): TIdentifier {
        /* if (typeof this.id === 'undefined') {
            const error = Exception.new({ code: Code.ENTITY_VALIDATION_ERROR, overrideMessage: `${this.constructor.name}: ID is empty.` });
            throw new HttpException(error.message, error.code);
        } */

        return this.id;
    }

    public setId(id: TIdentifier) {
        this.id = id;
    }

    public async validate(): Promise<void> {
        const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
        if (details) {
            Logger.error(details.errors);
            const error = Exception.new({ code: HttpCode.ENTITY_VALIDATION_ERROR, data: details });
            throw new HttpException(error.message, error.code);
        }
    }

}
