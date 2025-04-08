import {BaseResourceModel} from "../abastracts/base-resource-model";

export class ReadingGoal extends BaseResourceModel {

  constructor(
    public goalType?: 'DAILY' | 'WEEKLY' | 'MONTHLY',
    public goalPages?: number,
    public goalBooks?: number,
    public booksCompleted?: number,
    public pagesRead?: number,
    public startDate?: Date,
    public endDate?: Date,
    public status?: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED',
    public userId?: string,
    public userReadingId?: string,
    public pdfId?: string,
    public name?: string,
    public description?: string,
    public pagesPerDay?: number,
    public goalAchieved?: boolean,
    public selectedBooks?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public booksNames?: string[],
  ) {
    super();
  }

  static fromJson(jsonData: any): ReadingGoal {
    return Object.assign(new ReadingGoal(), jsonData);
  }
}
