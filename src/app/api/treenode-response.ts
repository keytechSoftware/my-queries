    export class TreeNodeResponse {
        constructor(
            public TargetLinks: TargetLink[]
        ){}

        public static ToArray(response:TreeNodeResponse){  
            let keys = [];
            for (let key in response.TargetLinks) {
                keys.push({value: response.TargetLinks[key]});
            }
            return keys;
        }
    }

    export class TargetLink {
    constructor(
        public EntryName: string,
        public LinkID: string,
        public ParentID: number,
        public TargetElementKey: string,
    ){}

    }