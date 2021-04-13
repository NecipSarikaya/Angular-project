import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {

  baseUrl: string = "http://localhost:5000/api/user/";

  constructor(private http: HttpClient) {}

  GetResetUser(id):Observable<any>{
    return this.http.get<any>(this.baseUrl+"reset/"+id);
  }
  GetCurrentUser(id):Observable<any>{
    return this.http.get<any>(this.baseUrl+id);
  }
  UpdateUser(model:any,id):Observable<any>{
    return this.http.put<any>(this.baseUrl+id,model);
  }
  GetUserPublishedPosts(id):Observable<any>{
    return this.http.get<any>(this.baseUrl+"published/"+id);
  }
  GetUserLikedPosts(id):Observable<any>{
    return this.http.get<any>(this.baseUrl+"liked/"+id);
  }
  FollowUser(model:any):Observable<any>{
    return this.http.post<any>(this.baseUrl,model);
  }
}
