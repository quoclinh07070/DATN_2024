import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortById'
})
export class SortByIdPipe implements PipeTransform {
  transform(products: any[]): any[] {
    if (!products) return [];
    return products.sort((a, b) => b.id - a.id); // Sắp xếp theo id giảm dần
  }
}
