import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { DepartmetService } from "../_services/department.service";

@Injectable()
export class DepartmentGetAllResolver implements Resolve<any> {
  constructor(private _departmentService:DepartmetService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._departmentService.GetAllDepartments()
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
