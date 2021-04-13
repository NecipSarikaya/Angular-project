import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "../_services/user.service";

@Injectable()
export class UserProfileResolver implements Resolve<any> {
  constructor(private _userService:UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this._userService.GetCurrentUser(route.params['id'])
      .pipe(catchError(err=>{
        console.log(err)
        return of(null);
      }))
  }
}
