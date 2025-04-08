import {BaseResourceModel} from "../abastracts/base-resource-model";

export class Category extends BaseResourceModel {

    constructor(public name?: string,
                public description?: string,
                public userId?: string
                ) {
        super();
    }

    static fromJson(jsonData: any): Category {
        return Object.assign(new Category(), jsonData);
    }
}
