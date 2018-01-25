export interface IBaseQueryActions {
    select(...fields: string[]): Query;

    orderBy(field: string, order: string): Query; // TOOD + Enum

    filter(e: any): Query;

    skip(skip: number): Query;

    top(top: number): Query;

    count(count: boolean): Query;

    expand(propertyName: string): Query;

    compile(): string;
}

export class Query implements IBaseQueryActions {
    private _select: Array<string> = [];
    private _filter: Array<any> = [];
    private _orderBy: Array<any> = [];
    private _expand: Array<Query> = [];
    private _skip: number;
    private _top: number;
    private _count: boolean;
    private _extendedPropName: string;

    public static create(): Query {
        return new Query();
    }

    private constructor(extendedPropName?: string) {
        this._extendedPropName = extendedPropName;
    }

    public orderBy(field: string, order: string): Query {
        throw new Error("Not implemented");
    }

    public expand(propertyName: string, func?: (query: Query) => Query): Query {
        let exQuery = new Query(propertyName);

        if (func != null) {
            func(exQuery);
        }

        this._expand.push(exQuery);

        return this;
    }

    public filter(e: any): Query {
        throw new Error("Not implemented");
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
            // TODO
        }

        if (this._orderBy.length > 0) {
            // TODO
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

        if (resultStr.length > 0 && !isExpand)
            resultStr = `?${resultStr}`;


        return resultStr;
    }
}