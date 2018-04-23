import { Element } from "./element";
import { ElementResponse } from "./element-response";

    export class SearchResponse extends ElementResponse {

        public static ToArray(response: SearchResponse){  
            let keys = [];
            for (let key in response.ElementList) {
                keys.push({value: response.ElementList[key]});
            }
            return keys;
        }

    };



