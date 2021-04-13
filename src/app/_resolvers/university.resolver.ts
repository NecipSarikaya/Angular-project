import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { UniversityService } from "../_services/university.service";

@Injectable()
export class UniversityByIdResolver implements Resolve<any> {
  constructor(private _universityService:UniversityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._universityService.GetUniByUniNameUrl(route.params['name'])
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
