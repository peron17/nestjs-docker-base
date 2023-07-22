export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Pagination<TCount, TItems> = {
    total: TCount,
    items: TItems,
};

export type CodeStructure = {
    code: number,
    message: string
}