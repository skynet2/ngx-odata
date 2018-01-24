import { Query } from "./query";

export class ExpandQuery extends Query {
    private _rootQuery: Query;
    private _extendPropName: string;

    public constructor(propName: string, root: Query) {
        super();
        this._rootQuery = root;
        this._extendPropName = propName;
    }

    public getRoot(): Query {
        return this._rootQuery;
    }
}
