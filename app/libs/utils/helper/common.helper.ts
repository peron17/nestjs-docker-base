const isEmpty = (value: any): boolean =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

export default isEmpty;

export const differenceBetweenTwoArrays = (arr1: any[], arr2: any[]) => {
    return arr1.filter(x => arr2.indexOf(x) === -1)
}