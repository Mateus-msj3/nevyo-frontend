import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {
  transform(firstName: string | undefined, lastName: string | undefined): string {
    return `${firstName || ''} ${lastName || ''}`.trim();
  }
}