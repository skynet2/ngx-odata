import { OperatorType, OrderBy, Query } from "./objects/query";

export * from './objects/query'

declare global {
    interface Window {
        Query: any;
        OperatorType: any;
        OrderBy: any;
    }
}

window.Query = Query || {};
window.OperatorType = OperatorType || {};
window.OrderBy = OrderBy || {};
