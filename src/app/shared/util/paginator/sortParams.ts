export class SortParams {
    column: string | undefined;
    direction = 'ASC';

    constructor(column: string | undefined, direction: number | undefined) {
        this.column = column;
        this.direction = direction && direction > 0 ? 'ASC' : 'DESC';
    }

    toString(): string {
        return `${this.column},${this.direction}`;
    }

}
