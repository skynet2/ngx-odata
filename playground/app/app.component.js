"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var query_1 = require("../../src/objects/query");
var http_1 = require("@angular/common/http");
var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        this.http = http;
        this.testEndpoint();
    }
    AppComponent.prototype.testEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, x, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = query_1.Query.create()
                            .expand('Requester', function (o) { return o.select('Email', 'ID'); })
                            .expand('Responder', function (o) { return o.select('Email', 'ID'); })
                            .orderBy('Created', query_1.OrderBy.Desc)
                            .orderBy('Status', query_1.OrderBy.Desc);
                        x = new http_1.HttpHeaders();
                        x = x.set('Authorization', 'Bearer BR-j3XxWgvgrTvFqkFVJ-XvL6s20E_4w3qGlvKyDRaKGW95TnCiga3dKQRo1fNFp462yi2x-T90P0pl2yUKYAhYrexsybGx0hZegGE4_ufQlW2cjJDhc3c0brRxs_SHxhU7fcv5m4NqJvB9YLa581iOq9OG8d2EB3uuu8tM0g2lnC6wIe454Z2Okf7vwrGBtuyx438AJa58sUh52n7iETE6b9YhJQNje5BM2VZIQ9f-wTrfoI3aNnRgXMBonu_M9pfRzg98gZaSLO5jHFCGrMb7FzhO4zoc44NFZbHIkBd_hqxqhuAsZ0bsqntfVjhBalbKWRUl8LvJjujTWleFPmxpEQrN8PKlc5EMpO8yc-0oVgPMHcd2bioHwPM3AOBBY-uPXSyIIVoG-YOZ7nIkqXcfBPKJWLU6v9aBuebFbeV3pYrvS041M0JsE5c8w2l_t42mNYuFNP5IcVA80iXv57ndMdrGljVgtVIZOOIpMyWrjUuvP5q86-cEjiRZOjmc6es5GO7nUmFS2kkc-ifsLTw');
                        this.generatedUrl = "http://dating-api.dev.ak-tech.org/PrivateKeys?" + query.compile();
                        _a = this;
                        return [4 /*yield*/, this.http.get(this.generatedUrl, { headers: x }).toPromise()];
                    case 1:
                        _a.resp = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.complexFilterQuery = function () {
        return query_1.Query.create()
            .filter('Id', query_1.OperatorType.Greater, 1)
            .filter('ReferenceId', query_1.OperatorType.Eq, 'c8027a81-5f7a-4a24-87a4-eec9afe48751')
            .filterComplex("Status eq 'Pending' or Status eq 'Approved'")
            .filter('Name', query_1.OperatorType.NotEqual, 'qwerty').compile();
    };
    AppComponent.prototype.expandQuery = function () {
        return query_1.Query.create()
            .expand('Prop1')
            .expand('Prop2', function (o) {
            o.select('Id', 'Name', 'Value')
                .orderBy('Id', query_1.OrderBy.Asc)
                .top(5);
        })
            .expand('Complex', function (o) {
            o.select('Id', 'Name')
                .expand('Internal', function (i) {
                i.select('Description', 'Requester')
                    .skip(5);
            });
            return o;
        })
            .select('RootId', 'RootName').compile();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "ComplexFilter : {{complexFilterQuery()}}\n    <hr> Expand : {{expandQuery()}}\n    <hr>\n    {{generatedUrl}}<br>\n    <br> {{resp | json}}",
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map