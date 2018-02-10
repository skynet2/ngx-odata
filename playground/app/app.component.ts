import { Component } from '@angular/core';
import { OperatorType, OrderBy, Query } from "../../src/objects/query";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
    selector: 'my-app',
    template: `ComplexFilter : {{complexFilterQuery()}}
    <hr> Expand : {{expandQuery()}}
    <hr>
    {{generatedUrl}}<br>
    <br> {{resp | json}}`,
})
export class AppComponent {

    public resp: any;
    public generatedUrl: string;

    constructor(private http: HttpClient) {
        this.testEndpoint();
    }

    private async testEndpoint() {
        const query = Query.create()
            .expand('Requester', o => o.select('Email', 'ID'))
            .expand('Responder', o => o.select('Email', 'ID'))
            .orderBy('Created', OrderBy.Desc)
            .orderBy('Status', OrderBy.Desc);

        let x = new HttpHeaders();
        this.generatedUrl = `http://localhost/PrivateKey?${query.compile()}`;

        this.resp = await this.http.get(this.generatedUrl,
            { headers: x }).toPromise()
    }

    public complexFilterQuery(): string {
        return Query.create()
            .filter('Id', OperatorType.Greater, 1)
            .filter('ReferenceId', OperatorType.Eq, 'c8027a81-5f7a-4a24-87a4-eec9afe48751')
            .filterComplex(`Status eq 'Pending' or Status eq 'Approved'`)
            .filter('Name', OperatorType.NotEqual, 'qwerty').compile();
    }

    public expandQuery(): string {
        return Query.create()
            .expand('Prop1')
            .expand('Prop2', o => {
                o.select('Id', 'Name', 'Value')
                    .orderBy('Id', OrderBy.Asc)
                    .top(5);
            })
            .expand('Complex', o => {
                o.select('Id', 'Name')
                    .expand('Internal', i => {
                        i.select('Description', 'Requester')
                            .skip(5)
                    });
                return o;
            })
            .select('RootId', 'RootName').compile()
    }
}