import { OperatorType, Query } from "ngx-odata-v4";

alert(Query.create().select('Field1', 'Field2', 'Field3').filter('Field', OperatorType.Eq, '123').compile());