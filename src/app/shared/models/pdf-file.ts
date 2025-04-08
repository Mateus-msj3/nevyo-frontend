import {BaseResourceModel} from "../abastracts/base-resource-model";

export class PdfFile extends BaseResourceModel {

  constructor(
    public title?: string,
    public fileData?: string,
    public filePath?: string,
    public totalPages?: number,
    public originalFileName?: string,
    public imageBanner?: string,
    public size?: number,
    public favorite?: boolean,
    public lastAccessedAt?: Date,
    public categoryId?: number,
    public userId?: string,
    public userReadingId?: string,
    public categoryName?: string,
    public description?: string,
    public archived?: boolean,
    public tags?: string[],
    public checksum?: string
  ) {
    super();
  }
  static fromJson(jsonData: any): PdfFile {
    return Object.assign(new PdfFile(), jsonData);
  }
}
