import {BaseResourceModel} from "../abastracts/base-resource-model";
import {Store} from "./store";

export class Category extends BaseResourceModel {

    constructor(public name?: string,
                public description?: string,
                public store?: Store
                ) {
        super();
    }

    static fromJson(jsonData: any): Category {
        return Object.assign(new Category(), jsonData);
    }
}
