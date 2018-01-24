import { ExpandQuery } from "./expandQuery";

export interface IBaseQueryActions {
    select(...fields: string[]): Query;

    orderBy(field: string, order: string): Query; // TOOD + Enum

    filter(e: any): Query;

    skip(skip: number): Query;

    top(top: number): Query;

    count(count: boolean): Query;

    expand(propertyName: string): ExpandQuery;

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

    public expand(propertyName: string): ExpandQuery {
        let exQuery = new ExpandQuery(propertyName, this);

        this._expand.push(exQuery);

        return exQuery;
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

    public compile(): string {
        let isExpand = this instanceof ExpandQuery;

        return "";
    }
}