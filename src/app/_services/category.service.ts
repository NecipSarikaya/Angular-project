import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {

  baseUrl: string = "http://localhost:5000/api/category/";

  constructor(private http: HttpClient) {}

  GetCategories():Observable<any[]>{
    return this.http.get<[]>(this.baseUrl)
  }
  GetCategoryByNameUrl(nameUrl:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+nameUrl)
  }

}
