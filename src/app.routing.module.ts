import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./app/auth/login/login.component";
import { RegisterComponent } from "./app/auth/register/register.component";
import { CatpostlistComponent } from "./app/catpost/catpostlist/catpostlist.component";
import { HomeComponent } from "./app/essentials/home/home.component";
import { CatPostResolver } from "./app/_resolvers/catpost.resolver";
import { UnipostlistComponent } from "./app/unipost/unipostlist/unipostlist.component";
import { CategoryResolver } from "./app/_resolvers/category.resolver";
import { CatpostdetailComponent } from "./app/catpost/catpostdetail/catpostdetail.component";
import { CatPostDetailResolver } from "./app/_resolvers/catpost.detail.resolver";
import { UniPostResolver } from "./app/_resolvers/unipost.resolver";
import { UniversityByIdResolver } from "./app/_resolvers/university.resolver";
import { DepartmentResolver } from "./app/_resolvers/department.resolver";
import { UnipostdetailComponent } from "./app/unipost/unipostdetail/unipostdetail.component";
import { UniPostDetailResolver } from "./app/_resolvers/unipostdetail.resolver";
import { UnipostdepComponent } from "./app/unipost/unipostdep/unipostdep.component";
import { UniPostByDepResolver } from "./app/_resolvers/unipostbydep.resolver";
import { SelectedDepResolver } from "./app/_resolvers/selecteddep.resolver";
import { CategorylistComponent } from "./app/admin/category/categorylist/categorylist.component";
import { CategorydetailComponent } from "./app/admin/category/categorydetail/categorydetail.component";
import { CategoryByNameUrlResolver } from "./app/_resolvers/categorybynameurl.resolver";
import { UniversitylistComponent } from "./app/admin/university/universitylist/universitylist.component";
import { UniversitydetailComponent } from "./app/admin/university/universitydetail/universitydetail.component";
import { UniversityGetAllResolver } from "./app/_resolvers/universitygetall.resolver";
import { DepartmentlistComponent } from "./app/admin/department/departmentlist/departmentlist.component";
import { DepartmentdetailComponent } from "./app/admin/department/departmentdetail/departmentdetail.component";
import { DepartmentGetAllResolver } from "./app/_resolvers/departmentsgetall.resolver";
import { DepartmentByNameUrlResolver } from "./app/_resolvers/departmentgetnameurl.resolver";
import { UniversityDetailResolver } from "./app/_resolvers/universitydetail.resolver";
import { AdminunipostlistComponent } from "./app/admin/unipost/adminunipostlist/adminunipostlist.component";
import { UniPostAdminResolver } from "./app/_resolvers/unipost.admin.resolver";
import { AdmincatpostlistComponent } from "./app/admin/catpost/admincatpostlist/admincatpostlist.component";
import { CatPostAdminResolver } from "./app/_resolvers/catpost.admin.resolver";
import { UserlistComponent } from "./app/admin/user/userlist/userlist.component";
import { AuthGuard } from "./app/_guards/auth.guard";
import { AdminCategoryResolver } from "./app/_resolvers/category.admin.resolver";
import { UniversityAdminResolver } from "./app/_resolvers/university.admin.resolver";
import { AdminCatCommentResolver } from "./app/_resolvers/catcomment.admin.resolver";
import { AdmincatcommentlistComponent } from "./app/admin/catpost/admincatcommentlist/admincatcommentlist.component";
import { UniCommentAdminResolver } from "./app/_resolvers/unicomment.admin.resolver";
import { AdminunicommentlistComponent } from "./app/admin/unipost/adminunicommentlist/adminunicommentlist.component";
import { AdminAuthGuard } from "./app/_guards/admin.guard";
import { UserResolver } from "./app/_resolvers/user.resolver";
import { ProfileComponent } from "./app/user/profile/profile.component";
import { UserProfileResolver } from "./app/_resolvers/profil.user.resolver";
import { UniDepAllResolver } from "./app/_resolvers/unidep.all.resolver";
import { ResetPasswordComponent } from "./app/user/reset-password/reset-password.component";
import { UserPublishedResolver } from "./app/_resolvers/user.profile.posts.resolver";
import { UserLikedResolver } from "./app/_resolvers/user.profile.liked.resolver";
import { HowitworksComponent } from "./app/essentials/howitworks/howitworks.component";
import { UserProfileResetResolver } from "./app/_resolvers/user.reset.resolver";
import { ConfirmComponent } from "./app/user/confirm/confirm.component";
import { LinksComponent } from "./app/essentials/links/links.component";

export const appRoutes :Routes = [
  {path:"",resolve:{universities:UniversityGetAllResolver,categories:CategoryResolver},component:HomeComponent},
  {path:"kayit-ol",resolve:{data:UniDepAllResolver},component:RegisterComponent},
  {path:"giris-yap",component:LoginComponent},
  {path:"mail-onay",component:ConfirmComponent},
  {path:"nasil",component:HowitworksComponent},
  {path:"iletisim",component:LinksComponent},
  {path:"kategori-postlari/:name",canActivate:[AuthGuard],resolve:{catposts:CatPostResolver,categories:CategoryResolver},component:CatpostlistComponent},
  {path:"kategori-postlari/:name/:id",canActivate:[AuthGuard],resolve:{post:CatPostDetailResolver},component:CatpostdetailComponent},
  {path:"universite-postlari/:name",canActivate:[AuthGuard],resolve:{departments:DepartmentResolver,university:UniversityByIdResolver,unipost:UniPostResolver},component:UnipostlistComponent},
  {path:"universite-postlari/:name/:depName",canActivate:[AuthGuard],resolve:{departments:DepartmentResolver,uniposts:UniPostByDepResolver,university:UniversityByIdResolver},component:UnipostdepComponent},
  {path:"universite-postlari/:name/detay/:id",canActivate:[AuthGuard],resolve:{post:UniPostDetailResolver},component:UnipostdetailComponent},
  {path:"profil/:id",canActivate:[AuthGuard],resolve:{likedPosts:UserLikedResolver,publishedPosts:UserPublishedResolver,user:UserProfileResolver,data:UniDepAllResolver},component:ProfileComponent},
  {path:"sifresifirla/:id",resolve:{user:UserProfileResetResolver},component:ResetPasswordComponent},
  {path:"admin/kategori",canActivate:[AdminAuthGuard,AuthGuard],resolve:{categories:AdminCategoryResolver},component:CategorylistComponent},
  {path:"admin/kategori/:catNameUrl",canActivate:[AdminAuthGuard,AuthGuard],component:CategorydetailComponent},
  {path:"admin/universite",canActivate:[AdminAuthGuard,AuthGuard],resolve:{universities:UniversityAdminResolver},component:UniversitylistComponent},
  {path:"admin/universite/:name",canActivate:[AdminAuthGuard,AuthGuard],resolve:{departmens:UniversityDetailResolver,university:UniversityByIdResolver},component:UniversitydetailComponent},
  {path:"admin/departman",canActivate:[AdminAuthGuard,AuthGuard],resolve:{departments:DepartmentGetAllResolver},component:DepartmentlistComponent},
  {path:"admin/departman/:name",canActivate:[AdminAuthGuard,AuthGuard],component:DepartmentdetailComponent},
  {path:"admin/universite-postlari",canActivate:[AdminAuthGuard,AuthGuard],resolve:{uniposts:UniPostAdminResolver},component:AdminunipostlistComponent},
  {path:"admin/kategori-postlari",canActivate:[AdminAuthGuard,AuthGuard],resolve:{catposts:CatPostAdminResolver},component:AdmincatpostlistComponent},
  {path:"admin/kategoriyorumlari",canActivate:[AdminAuthGuard,AuthGuard],resolve:{catcomments:AdminCatCommentResolver},component:AdmincatcommentlistComponent},
  {path:"admin/universiteyorumlari",canActivate:[AdminAuthGuard,AuthGuard],resolve:{catcomments:UniCommentAdminResolver},component:AdminunicommentlistComponent},
  {path:"admin/kullanicilar",canActivate:[AdminAuthGuard,AuthGuard],resolve:{users:UserResolver},component:UserlistComponent},
  {path:"**",resolve:{universities:UniversityGetAllResolver},component:HomeComponent}
]

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule{

}
