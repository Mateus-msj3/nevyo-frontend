import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDiff',
})
export class DateDiffPipe implements PipeTransform {
  transform(startDate?: Date | string, endDate: Date | string = new Date(), unit: 'days' | 'months' | 'years' = 'days'): number {
    const start = new Date(startDate!);
    const end = new Date(endDate);

    // Calcula a diferença em milissegundos
    const diffInMs = end.getTime() - start.getTime();

    // Conversão do tempo com base na unidade fornecida
    switch (unit) {
      case 'days':
        return Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Milissegundos para Dias
      case 'months':
        return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      case 'years':
        return end.getFullYear() - start.getFullYear();
      default:
        return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    }
  }
}
