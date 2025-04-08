import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: false
})
export class FileSizePipe implements PipeTransform {
  transform(size: number, decimals: number = 2): string {
    if (!size) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(decimals)} ${units[unitIndex]}`;
  }
}
