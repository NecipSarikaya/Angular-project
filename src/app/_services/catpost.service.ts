import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CatPostService {

  baseUrl: string = "http://localhost:5000/api/catpost/";

  constructor(private http: HttpClient) {}

  getCatPostsByParams(name: string, page: any): Observable<any []> {
    let params = new HttpParams();
    if(!page){
      page = 1;
    }
    params = params.append('page', page);
    return this.http.get<any []>(this.baseUrl + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: params,
    });
  }
  GetCatPost(nameUrl:any,id:any):Observable< any>{
    return this.http.get<any>(this.baseUrl+nameUrl+"/"+id);
  }
  PublishPost(model:any,catNameUrl:string):Observable< any>{
    return this.http.post<any>(this.baseUrl+catNameUrl,model);
  }
  LikePost(model:any,postId:number):Observable<any>{
    return this.http.put<any>(this.baseUrl+postId,model);
  }
  UploadImage(files: any, postId){
    let formData = new FormData();
    for (let file of files){
        formData.append('files', file);
    }
    return this.http.post(
      this.baseUrl+"upload/" + postId,
      formData
    );
  }
}
