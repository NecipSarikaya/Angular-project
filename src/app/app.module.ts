import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from 'src/app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './essentials/navbar/navbar.component';
import { FooterComponent } from './essentials/footer/footer.component';
import { HomeComponent } from './essentials/home/home.component';
import { ContactComponent } from './essentials/contact/contact.component';
import { HowitworksComponent } from './essentials/howitworks/howitworks.component';
import { UnisearchComponent } from './unipost/unisearch/unisearch.component';
import { UnipostlistComponent } from './unipost/unipostlist/unipostlist.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LinksComponent } from './essentials/links/links.component';
import { CatpostlistComponent } from './catpost/catpostlist/catpostlist.component';
import { CatPostResolver } from './_resolvers/catpost.resolver';
import { JwtModule } from '@auth0/angular-jwt';
import { CategoryResolver } from './_resolvers/category.resolver';
import { CatpostdetailComponent } from './catpost/catpostdetail/catpostdetail.component';
import { CatPostDetailResolver } from './_resolvers/catpost.detail.resolver';
import { UniPostResolver } from './_resolvers/unipost.resolver';
import { UniversityByIdResolver } from './_resolvers/university.resolver';
import { UniPostByDepResolver } from './_resolvers/unipostbydep.resolver';
import { DepartmentResolver } from './_resolvers/department.resolver';
import { UnipostdetailComponent } from './unipost/unipostdetail/unipostdetail.component';
import { UniPostDetailResolver } from './_resolvers/unipostdetail.resolver';
import { UnipostdepComponent } from './unipost/unipostdep/unipostdep.component';
import { SelectedDepResolver } from './_resolvers/selecteddep.resolver';
import { CategorylistComponent } from './admin/category/categorylist/categorylist.component';
import { CategorydetailComponent } from './admin/category/categorydetail/categorydetail.component';
import { UniversitylistComponent } from './admin/university/universitylist/universitylist.component';
import { UniversitydetailComponent } from './admin/university/universitydetail/universitydetail.component';
import { DepartmentdetailComponent } from './admin/department/departmentdetail/departmentdetail.component';
import { DepartmentlistComponent } from './admin/department/departmentlist/departmentlist.component';
import { DataTablesModule } from 'angular-datatables';
import { CategoryByNameUrlResolver } from './_resolvers/categorybynameurl.resolver';
import { CategorycreateComponent } from './admin/category/categorycreate/categorycreate.component';
import { UniversityGetAllResolver } from './_resolvers/universitygetall.resolver';
import { UniversitycreateComponent } from './admin/university/universitycreate/universitycreate.component';
import { DepartmentcreateComponent } from './admin/department/departmentcreate/departmentcreate.component';
import { DepartmentGetAllResolver } from './_resolvers/departmentsgetall.resolver';
import { DepartmentByNameUrlResolver } from './_resolvers/departmentgetnameurl.resolver';
import { UniversityDetailResolver } from './_resolvers/universitydetail.resolver';
import { AdminunipostlistComponent } from './admin/unipost/adminunipostlist/adminunipostlist.component';
import { UniPostAdminResolver } from './_resolvers/unipost.admin.resolver';
import { AdmincatpostlistComponent } from './admin/catpost/admincatpostlist/admincatpostlist.component';
import { CatPostAdminResolver } from './_resolvers/catpost.admin.resolver';
import { CategorycardComponent } from './essentials/categorycard/categorycard.component';
import { UserlistComponent } from './admin/user/userlist/userlist.component';
import { NgxLoadingModule } from 'ngx-loading';
import { AuthGuard } from './_guards/auth.guard';
import { AdminCategoryResolver } from './_resolvers/category.admin.resolver';
import { UniversityAdminResolver } from './_resolvers/university.admin.resolver';
import { AdminunicommentlistComponent } from './admin/unipost/adminunicommentlist/adminunicommentlist.component';
import { AdmincatcommentlistComponent } from './admin/catpost/admincatcommentlist/admincatcommentlist.component';
import { AdminCatCommentResolver } from './_resolvers/catcomment.admin.resolver';
import { UniCommentAdminResolver } from './_resolvers/unicomment.admin.resolver';
import { AdminAuthGuard } from './_guards/admin.guard';
import { UserResolver } from './_resolvers/user.resolver';
import { ProfileComponent } from './user/profile/profile.component';
import { UserProfileResolver } from './_resolvers/profil.user.resolver';
import { UniDepAllResolver } from './_resolvers/unidep.all.resolver';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { UserPublishedResolver } from './_resolvers/user.profile.posts.resolver';
import { UserLikedResolver } from './_resolvers/user.profile.liked.resolver';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SearchfilterPipe } from './searchfilter.pipe';
import { UserProfileResetResolver } from './_resolvers/user.reset.resolver';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UnisearchfilterPipe } from './unisearchfilter.pipe';
import { ProgressBarModule } from 'angular-progress-bar';
import { NgxGalleryModule } from 'ngx-gallery';
import 'hammerjs';

import {HammerGestureConfig , HAMMER_GESTURE_CONFIG } from '@angular/platform-browser/';
import * as Hammer from 'hammerjs';
import { ConfirmComponent } from './user/confirm/confirm.component';

export class CustomHammerConfig extends HammerGestureConfig{
  overrides = {
    'pan' : {
      direction : Hammer.DIRECTION_ALL
    }
  }
}

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    HowitworksComponent,
    UnisearchComponent,
    UnipostlistComponent,
    LinksComponent,
    CatpostlistComponent,
    CatpostdetailComponent,
    UnipostdetailComponent,
    UnipostdepComponent,
    CategorylistComponent,
    CategorydetailComponent,
    UniversitylistComponent,
    UniversitydetailComponent,
    DepartmentdetailComponent,
    DepartmentlistComponent,
    CategorycreateComponent,
    UniversitycreateComponent,
    DepartmentcreateComponent,
    AdminunipostlistComponent,
    AdmincatpostlistComponent,
    CategorycardComponent,
    UserlistComponent,
    AdminunicommentlistComponent,
    AdmincatcommentlistComponent,
    ProfileComponent,
    ResetPasswordComponent,
    SearchfilterPipe,
    UnisearchfilterPipe,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    NgxGalleryModule,
    ProgressBarModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5000"],
        disallowedRoutes:["localhost:5000/api/auth"]
      }
    }),
    DataTablesModule
  ],
  providers: [{provide: HAMMER_GESTURE_CONFIG,useClass: CustomHammerConfig},UserProfileResetResolver,UserLikedResolver,UserPublishedResolver,UniDepAllResolver,UserProfileResolver,UserResolver,AdminAuthGuard,UniCommentAdminResolver,AdminCatCommentResolver,UniversityAdminResolver,AdminCategoryResolver,AuthGuard,CatPostAdminResolver,UniPostAdminResolver,UniversityDetailResolver,DepartmentByNameUrlResolver,DepartmentGetAllResolver,UniversityGetAllResolver,CategoryByNameUrlResolver,SelectedDepResolver,UniPostDetailResolver,DepartmentResolver,UniPostByDepResolver,UniversityByIdResolver,UniPostResolver,CatPostResolver,CategoryResolver,CatPostDetailResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
