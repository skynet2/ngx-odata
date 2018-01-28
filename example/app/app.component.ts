import { Component } from '@angular/core';
import { OperatorType, Query } from "../../src/objects/query";

@Component({
    selector: 'my-app',
    template: `{{compiled}}`,
})
export class AppComponent {

    public compiled: string;

    constructor() {
        let query = Query.create();
        this.compiled = (query.skip(1).top(50)
            .expand('Request', a =>
                a.select("abcd", "vcd").top(5).skip(5).expand("InternalUser",
                    y => y.top(100500)))
            .expand("Responder")
            .filter('ID', OperatorType.Eq, 'fb94d7e9-7244-479d-aa4b-29ade7ffaa27')
            .filter('Id2', OperatorType.Eq, 'qwerty')
            .filter('Id3', OperatorType.Eq, 123).compile());
    }
}