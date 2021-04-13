import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DepartmetService {

  baseUrl: string = "http://localhost:5000/api/department/";
  baseUrl2:string = "http://localhost:5000/api/unidep/";

  constructor(private http: HttpClient) {}

  GetAllDepartments():Observable<any[]>{
    return this.http.get<any []>(this.baseUrl);
  }
  GetDepartmentsByUrl(uniNameUrl:string):Observable<any[]>{
    return this.http.get<any []>(this.baseUrl2+uniNameUrl);
  }
  GetSelectedDepartmant(depNameUrl:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+depNameUrl);
  }

}
