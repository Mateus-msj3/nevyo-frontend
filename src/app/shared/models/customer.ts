import {BaseResourceModel} from "../abastracts/base-resource-model";

export class Customer extends BaseResourceModel {
    constructor(
        public firstName?: string,
        public lastName?: string,
        public cpfOrCnpj?: string,
        public dateOfBirth?: Date,
        public password?: string,
        public email?: string,
        public phoneNumber?: string,
        public accountLocked: boolean = false,
        public enabled: boolean = true,
        public originalFileName?: string,
        public urlImageProfile?: string,
        public typeUser?: string,
        public zipCode?: string,
        public street?: string,
        public number?: string,
        public complement?: string,
        public district?: string,
        public city?: string,
        public state?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): Customer {
        return Object.assign(new Customer(), jsonData);
    }
}
