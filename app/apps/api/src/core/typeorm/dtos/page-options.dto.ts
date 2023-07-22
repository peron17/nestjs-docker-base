import { Order, defaultMaximum, defaultMinimum, defaultPerPage } from "apps/api/src/common/constants/page.constant";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class PageOptionsDto {
    @IsString()
    @IsOptional()
    readonly q: '';

    @IsString()
    @IsOptional()
    readonly id?: '';

    @IsString()
    @IsOptional()
    readonly status?: '';

    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.DESC;

    @Transform(({ value }) => parseInt(value))
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Transform(({ value }) => parseInt(value))
    @Type(() => Number)
    @IsInt()
    @Min(defaultMinimum)
    @Max(defaultMaximum)
    @IsOptional()
    readonly limit?: number = defaultPerPage;

    get skip(): number {
        return (this.page - 1) * this.limit;
    }
}