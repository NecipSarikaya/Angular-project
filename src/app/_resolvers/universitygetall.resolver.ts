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
export class UniversityGetAllResolver implements Resolve<any> {
  constructor(private _universityServiec:UniversityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._universityServiec.GetAllUniversities()
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
