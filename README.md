# ngx-odata
Simple typescript library for generating odata queries using fluent api.

[![NPM](https://nodei.co/npm/ngx-odata-v4.png)](https://nodei.co/npm/ngx-odata-v4/)

# Prerequisite
Can be used as typescript\javascript library. Angular is not required.

# Installation
#### npm
```
npm install ngx-odata
```
#### yarn
```
yarn add ngx-odata
```
# Integration
1. Install library
2. Import Query class 
```
import { Query } from "ngx-odata-v4";
```

# Examples
Simple query example
```ts
Query.create()
            .expand('Requester', o => o.select('Email', 'ID'))
            .expand('Responder', o => o.select('Email', 'ID'))
            .orderBy('Created', OrderBy.Desc)
            .orderBy('Status', OrderBy.Desc);
```
Complex query example
```
Query.create()
            .filter('Id', OperatorType.Greater, 1)
            .filter('ReferenceId', OperatorType.Eq, 'c8027a81-5f7a-4a24-87a4-eec9afe48751')
            .filterComplex(`Status eq 'Pending' or Status eq 'Approved'`)
            .filter('Name', OperatorType.NotEqual, 'qwerty').compile();
```
Complex expand query example
```ts
Query.create()
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
```
Angular usage Example
```
const query = Query.create()
            .expand('Requester', o => o.select('Email', 'ID'))
            .expand('Responder', o => o.select('Email', 'ID'))
            .orderBy('Created', OrderBy.Desc)
            .orderBy('Status', OrderBy.Desc);

        let x = new HttpHeaders();
        this.generatedUrl = `http://localhost/PrivateKey?${query.compile()}`;
        
        this.resp = await this.http.get(this.generatedUrl,
            { headers: x }).toPromise()
```

# GitHub
Please feel free to declare issues or contribute: https://github.com/skynet2/ngx-odata
