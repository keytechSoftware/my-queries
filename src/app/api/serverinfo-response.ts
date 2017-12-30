export class ServerInfoResponse {
    constructor (
        public ServerInfoResult: ServerInfoResult[]
    ){}

        public static ToKeyValueArray(response:ServerInfoResponse){  
            let keyValueArray = [];
            let data = response.ServerInfoResult;

            for (let entry in data) {
                keyValueArray.push({
                    key: data[entry].Key, 
                    value: data[entry].Value});
            }
            return keyValueArray;
        }

}

export class ServerInfoResult {
    constructor(
        public Key: string, 
        public Value: any 
    ){}
}