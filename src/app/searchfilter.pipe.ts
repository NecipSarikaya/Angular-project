import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(users : any[] , searchValue : string): any {
    if(!users || !searchValue){
      return users;
    }
    return users.filter(user =>
      user.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.lastName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.userName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );;
  }

}
