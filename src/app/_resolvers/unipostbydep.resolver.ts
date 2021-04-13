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
export class UniPostByDepResolver implements Resolve<any> {
  constructor(private _uniPostService:UniPostService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._uniPostService.GetUniPostsByUniDep(route.params['name'],route.params['depName'],route.queryParams['page'])
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
