import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unisearchfilter'
})
export class UnisearchfilterPipe implements PipeTransform {

  transform(datas: any, searchValue:any): any {
    if(!datas || !searchValue){
      return datas;
    }
    return datas.filter(data =>
      data.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      data.nameUrl.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );;
  }

}
