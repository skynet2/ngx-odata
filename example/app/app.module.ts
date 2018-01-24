import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { Query } from "../../src/objects/query";

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        let query = new Query();
        query.skip(1).expand('Request', a => a.select("abcd","vcd")).compile();
        let result = query.expand("abcd").compile();
    }
}