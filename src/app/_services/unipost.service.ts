import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UniPostService {

  baseUrl: string = "http://localhost:5000/api/unipost/";

  constructor(private http: HttpClient) {}

  GetUniPostsByUni(uniNameUrl:string,page):Observable<any []>{
    let params = new HttpParams();
    if(!page){
      page = 1;
    }
    params = params.append('page', page);
    return this.http.get<any []>(this.baseUrl+uniNameUrl,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: params,
    });
  }
  GetUniPostsByUniDep(uniNameUrl:string,depNameUrl,page):Observable<any []>{
    let params = new HttpParams();
    if(!page){
      page = 1;
    }
    params = params.append('page', page);
    return this.http.get<any []>(this.baseUrl+uniNameUrl+"/"+depNameUrl,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: params,
    });
  }
  CreatePost(model:any):Observable<any>{
    return this.http.post<any>(this.baseUrl,model);
  }
  LikePost(model:any,postId:number):Observable<any>{
    return this.http.put<any>(this.baseUrl+postId,model);
  }
  GetUniPostDetail(uniNameUrl:string,id):Observable<any>{
    return this.http.get<any>(this.baseUrl+uniNameUrl+"/detay/"+id);
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
