import {BaseResourceModel} from "../abastracts/base-resource-model";
import {PdfFile} from "./pdf-file";

export class ReadingProgress extends BaseResourceModel {

    constructor(public name?: string,
                public pdfId?: string,
                public userId?: string,
                public userReadingId?: string,
                public lastAccessedAt?: Date,
                public lastPageRead?: number,
                public pdfFile?: PdfFile,
                ) {
        super();
    }

    static fromJson(jsonData: any): ReadingProgress {
        return Object.assign(new ReadingProgress(), jsonData);
    }
}
