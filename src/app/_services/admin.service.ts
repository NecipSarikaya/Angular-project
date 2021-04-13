import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminService {

  baseUrl: string = "http://localhost:5000/api/admin/";

  constructor(private http: HttpClient) {}

  GetCategories() : Observable<any>{
    return this.http.get<any>(this.baseUrl+"category");
  }
  DeleteCategory(catId: any): Observable<any>{
    return this.http.delete<any>(this.baseUrl+"category/"+catId);
  }
  UpdateCategory(category:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+"category/"+category.id,category);
  }
  CreateCategory(category:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"category",category);
  }
  GetUniversities() : Observable<any>{
    return this.http.get<any>(this.baseUrl+"university");
  }
  GetAdminDetailUniversity(uniNameUrl):Observable<any>{
    return this.http.get<any>(this.baseUrl+'university/'+uniNameUrl);
  }
  DeleteUniversity(uniId: any): Observable<any>{
    return this.http.delete<any>(this.baseUrl+"university/"+uniId);
  }
  UpdateUniversity(university:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+"university/"+university.id,university);
  }
  CreateUniversity(university:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"university",university);
  }
  CreateUniDep(model:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"unidep",model);
  }
  DeleteUniDep(model:any):Observable<any>{
    return this.http.delete<any>(this.baseUrl+"unidep/"+model.uniId+"/"+model.depId);
  }
  GetAllDepartments():Observable<any[]>{
    return this.http.get<any []>(this.baseUrl+"department");
  }
  DeleteDepartment(depId):Observable<any>{
    return this.http.delete<any>(this.baseUrl+"department/"+depId);
  }
  CreateDepartment(department:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"department",department);
  }
  UpdateDepartment(department:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+"department/"+department.id,department);
  }
  GetAllUniPosts():Observable<any>{
    return this.http.get<any>(this.baseUrl+"unipost");
  }
  UpdateUniPost(model: any, id: any):Observable<any>{
    return this.http.put<any>(this.baseUrl+"unipost/"+id,model);
  }
  GetAllCatPosts():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+"catpost")
  }
  UpdateCatPost(model:any, id: any):Observable<any>{
    return this.http.put<any>(this.baseUrl+"catpost/"+id,model);
  }
  GetCatComments():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+"catcomment")
  }
  UpdateCatComment(model:any, id: any):Observable<any>{
    return this.http.put<any>(this.baseUrl+"catcomment/"+id,model);
  }
  GetUniComments():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+"unicomment")
  }
  UpdateUniComment(model:any, id: any):Observable<any>{
    return this.http.put<any>(this.baseUrl+"unicomment/"+id,model);
  }
  GetAllUser():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+"user")
  }
  UpdateUser(model:any, id: any):Observable<any>{
    return this.http.put<any>(this.baseUrl+"user/"+id,model);
  }
}
