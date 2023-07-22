import { PageMetaDtoParameters } from '../interfaces/page-meta-dto-parameters.interface';

export class PageMetaDto {
    readonly page: number;

    readonly limit: number;

    readonly itemCount: number;

    readonly pageCount: number;

    readonly hasPreviousPage: boolean;

    readonly hasNextPage: boolean;

    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
        this.page = Number(pageOptionsDto.page);
        this.limit = Number(pageOptionsDto.limit);
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.limit);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}