import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { UniPostService } from "../_services/unipost.service";

@Injectable()
export class UniPostResolver implements Resolve<any> {
  constructor(private _unipostService:UniPostService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._unipostService.GetUniPostsByUni(route.params['name'],route.queryParams['page'])
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
