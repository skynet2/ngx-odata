export interface IBaseQueryActions {
    select(...fields: string[]): Query;

    orderBy(field: string, order: OrderBy): Query;

    orderByComplex(orderBy: string): Query;

    filter(field: string, operator: OperatorType, val2: any): Query;

    filterComplex(filter: string): Query;

    skip(skip: number): Query;

    top(top: number): Query;

    count(count: boolean): Query;

    expand(propertyName: string): Query;

    compile(): string;
}

export enum OperatorType {
    Eq = <any>"eq",
    Less = <any>"lt",
    Greater = <any>"gt",
    GreaterOrEqual = <any>"ge",
    LessOrEqual = <any>"le",
    NotEqual = <any>"ne"
}

export enum OrderBy {
    Asc = <any>"asc",
    Desc = <any>"desc"
}

export class Query implements IBaseQueryActions {
    private _select: Array<string> = [];
    private _filter: Array<string> = [];
    private _orderBy: Array<string> = [];
    private _expand: Array<Query> = [];
    private _skip: number;
    private _top: number;
    private _count: boolean;
    private _extendedPropName: string;

    public static create(): Query {
        return new Query();
    }

    private static isGuid(value: string): boolean {
        value = value.toLowerCase();

        const regex = /[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i;
        let match = regex.exec(value);

        return match != null;
    }

    private constructor(extendedPropName?: string) {
        this._extendedPropName = extendedPropName;
    }

    public orderBy(field: string, order: OrderBy): Query {
        if (!field || field.length == 0)
            return this;

        return this.orderByComplex(`${field} ${order}`)
    }

    public orderByComplex(orderBy: string): Query {
        this._orderBy.push(orderBy);

        return this;
    }

    public expand(propertyName: string, func?: (query: Query) => void): Query {
        let exQuery = new Query(propertyName);

        if (func != null) {
            func(exQuery);
        }

        this._expand.push(exQuery);

        return this;
    }

    public filter(field: string, operator: OperatorType, val2: any): Query {

        if ((field == null || field.length == 0) || (val2 == null || val2.length == 0))
            return this;

        if (typeof val2 == "string" && !Query.isGuid(val2) && val2.indexOf("'") === -1) {
            val2 = `'${val2}'`;
        }

        return this.filterComplex(`${field} ${operator.toString()} ${val2}`);
    }

    public filterComplex(filter: string): Query {
        this._filter.push(filter);
        return this;
    }

    public skip(skip: number): Query {
        this._skip = skip;
        return this;
    }

    public top(top: number): Query {
        this._top = top;
        return this;
    }

    public count(count: boolean): Query {
        this._count = count;
        return this;
    }

    public select(...fields: string[]): Query {
        this._select = fields;
        return this;
    }

    private static checkAndAppend(result: string, prefix: string, delimiter: string, variable: any): string {
        if (variable == null)
            return result;

        if (typeof variable == "number" && variable == 0) {
            return result;
        }

        if (typeof variable == "boolean" && !variable) {
            return result;
        }

        if (variable)
            return Query.append(result, prefix, delimiter, variable);

        return result;
    }

    private static append(result: string, prefix: string, delimiter: string, variable: any): string {
        let length = result.length;

        if (length > 0)
            result = `${result}${delimiter}${prefix}=${variable}`;
        else
            result = `${prefix}=${variable}`;

        return result;
    }

    public compile(): string {
        let isExpand = this._extendedPropName != null && this._extendedPropName.length > 0;

        let resultStr = "";
        let delimiter = isExpand ? ';' : '&';

        if (this._top != 0) {
            resultStr = Query.checkAndAppend(resultStr, '$top', delimiter, this._top);
        }

        if (this._skip != 0) {
            resultStr = Query.checkAndAppend(resultStr, '$skip', delimiter, this._skip);
        }

        resultStr = Query.checkAndAppend(resultStr, '$count', delimiter, this._count);

        if (this._filter.length > 0) {
            resultStr = Query.checkAndAppend(resultStr, '$filter', delimiter, this._filter.join(` and `))
        }

        if (this._orderBy.length > 0) {
            resultStr = Query.checkAndAppend(resultStr, '$orderby', delimiter, this._orderBy.join(','));
        }

        if (this._select.length > 0) {
            resultStr = Query.checkAndAppend(resultStr, '$select', delimiter, this._select.join(','))
        }

        if (this._expand.length > 0) {
            let result = [];
            for (let item of this._expand) {
                let compiled = item.compile();

                result.push(compiled);
            }

            if (result.length > 0) {
                resultStr = Query.checkAndAppend(resultStr, '$expand', delimiter, result.join(','));
            }
        }

        if (resultStr.length > 0 && isExpand)
            resultStr = `(${resultStr})`;

        if (isExpand)
            resultStr = `${this._extendedPropName}${resultStr}`;

        return resultStr;
    }
}