import {BaseResourceModel} from "../abastracts/base-resource-model";
import {Role} from "./role";

export class User extends BaseResourceModel {

    constructor(public firstname?: string,
                public lastname?: string,
                public dateOfBirth?: Date,
                public email?: string,
                public password?: string,
                public phoneNumber?: string,
                public accountLocked?: boolean,
                public enabled?: boolean,
                public roles?: Role[],
                public urlImageProfile?: string) {
        super();
    }

    static fromJson(jsonData: any): User {
        return Object.assign(new User(), jsonData);
    }
}
