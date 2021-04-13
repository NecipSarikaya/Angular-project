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
export class CatPostDetailResolver implements Resolve<any> {
  constructor(private _catpostSetvice:CatPostService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._catpostSetvice.GetCatPost(route.params['name'],route.params['id'])
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
