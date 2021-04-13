import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AdminService } from "../_services/admin.service";

@Injectable()
export class UniversityDetailResolver implements Resolve<any> {
  constructor(private _adminService:AdminService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._adminService.GetAdminDetailUniversity(route.params['name'])
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
