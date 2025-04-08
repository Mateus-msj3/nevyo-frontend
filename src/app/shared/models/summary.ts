import {BaseResourceModel} from "../abastracts/base-resource-model";

export class Summary extends BaseResourceModel {

    constructor(public content?: string,
                public userId?: string
                ) {
        super();
    }

    static fromJson(jsonData: any): Summary {
        return Object.assign(new Summary(), jsonData);
    }
}
