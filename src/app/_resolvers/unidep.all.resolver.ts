import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class UniDepAllResolver implements Resolve<any> {
  constructor(private _authService:AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._authService.getRegisterData()
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
