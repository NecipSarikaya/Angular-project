import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { CategoryService } from "../_services/category.service";

@Injectable()
export class CategoryByNameUrlResolver implements Resolve<any> {
  constructor(private _categoryService:CategoryService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._categoryService.GetCategoryByNameUrl(route.params['catNameUrl'])
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
