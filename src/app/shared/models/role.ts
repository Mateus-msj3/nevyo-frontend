import {BaseResourceModel} from "../abastracts/base-resource-model";
import {User} from "./user";

export class Role extends BaseResourceModel {

    constructor(public name?: string,
                public active?: boolean,
                public createdBy?: string,
                public createdDate?: Date,
                public lastModifiedBy?: string,
                public lastModifiedDate?: Date,
                public users?: User[]) {
        super();
    }

    static fromJson(jsonData: any): Role {
        return Object.assign(new Role(), jsonData);
    }
}
