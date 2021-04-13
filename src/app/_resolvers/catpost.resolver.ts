import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { CatPostService } from "../_services/catpost.service";

@Injectable()
export class CatPostResolver implements Resolve<any> {
  constructor(private _catpostSetvice:CatPostService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._catpostSetvice.getCatPostsByParams(route.params['name'],route.queryParams['page'])
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
