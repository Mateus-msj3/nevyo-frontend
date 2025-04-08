import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: false
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    // Certifique-se de transformar a string em uma instância de Date
    const date = new Date(value);

    // Formata a hora no formato HH:mm:ss
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

}
