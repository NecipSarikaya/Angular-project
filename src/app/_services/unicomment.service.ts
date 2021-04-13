import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UniCommentService {

  baseUrl: string = "http://localhost:5000/api/unicomment/";

  constructor(private http: HttpClient) {}

  CreateUniComment(model:any):Observable<any>{
    return this.http.post<any>(this.baseUrl,model);
  }
  LikeComment(model:any,commentId:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+commentId,model);
  }
  SetFavorite(model:any,commentId:any,commentUserId):Observable<any>{
    let params = new HttpParams();
    if(!commentUserId){
      commentUserId = 0;
    }
    params = params.append('userId', commentUserId);
    return this.http.put<any>(this.baseUrl+commentId,model, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: params,
    });
  }
}
