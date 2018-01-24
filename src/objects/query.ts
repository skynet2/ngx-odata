import { ExpandQuery } from "./expandQuery";

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
    private _expand: Array<ExpandQuery> = [];
    private _skip: number;
    private _top: number;
    private _count: boolean;

    public orderBy(field: string, order: string): Query {
        throw new Error("Not implemented");
    }

    public expand(propertyName: string, func?: (query: ExpandQuery) => Query): Query {
        let exQuery = new ExpandQuery(propertyName, this);

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

    private checkAndAppend(result: string, prefix: string, delimiter: string, variable: any): void {

        if (variable instanceof Number) {
            if (variable == 0)
                return;
            else {
                Query.append(result, prefix, delimiter, variable);
            }
        }

        if (variable instanceof Boolean) {
            if (variable == false)
                return;
            else {
                Query.append(result, prefix, delimiter, variable);
            }
        }
    }

    private static append(result: string, prefix: string, delimiter: string, variable: any) {
        let length = result.length;

        if (length > 0)
            result = `${result}${delimiter}${prefix}=${variable}`;
    }

    public compile(): string {
        let isExpand = this instanceof ExpandQuery;

        let resultStr = "";
        let delimiter = isExpand ? ';' : '&';

        if (this._top != 0) {
            this.checkAndAppend(resultStr, '$top', delimiter, this._top);
        }

        if (this._skip != 0) {
            this.checkAndAppend(resultStr, '$skip', delimiter, this._skip);
        }

        this.checkAndAppend(resultStr, '$count', delimiter, this._count);

        if (this._filter.length > 0) {
            // TODO
        }

        if (this._expand.length > 0) {
            // TODO
        }

        if (this._orderBy.length > 0) {
            // TODO
        }

        if (resultStr.length > 0 && isExpand)
            resultStr = `(${resultStr})`;

        if (resultStr.length > 0)
            resultStr = `?${resultStr}`;

        return resultStr;
    }
}