import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO, isValid } from 'date-fns';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(value: string | Date, formatString: string = 'dd/MM/yyyy HH:mm:ss'): string {
    if (!value) return '';

    let date: Date;

    if (typeof value === 'string') {
      // Tenta converter a string para Date
      date = parseISO(value);
    } else if (value instanceof Date) {
      date = value;
    } else {
      return '';
    }

    // Verifica se a data é válida
    if (!isValid(date)) {
      return '';
    }

    // Formata a data usando date-fns
    return format(date, formatString);
  }
}
