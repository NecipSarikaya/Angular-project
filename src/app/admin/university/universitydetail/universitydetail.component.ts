import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-universitydetail',
  templateUrl: './universitydetail.component.html',
  styleUrls: ['./universitydetail.component.css']
})
export class UniversitydetailComponent implements OnInit {

  university:any ={};
  departments:any={};
  input:any=[];
  succesed = false;
  haveSearch;
  notHaveSearch;
  constructor(private _alertify:AlertifyService,private route:ActivatedRoute,private _adminService:AdminService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.university = data.university;
      this.departments = data.departmens;
      this.departments.notHave.splice(0,1);
    })
  }
  updateUni(){
    if(this.university == null){
      this._alertify.message()
      return;
    }
    this._adminService.UpdateUniversity(this.university).subscribe(data=>{
      if(data){
        this.succesed = true;
        this._alertify.success("Güncelleme işlemi başarıyla gerçekleşti..");
      }
    },err =>{
      this._alertify.error(err.error.message);
    })
  }
  RemoveDep(item){
    if(item == null){
      this._alertify.message()
      return;
    }
    var model = {
      uniId : this.university.id,
      depId : item.id
    }
    this._adminService.DeleteUniDep(model).subscribe(data=>{
      this.departments.notHave.push(item);
      this._alertify.success("Kaldırma işlemi başarıyla gerçekleşti..");
      let index = 0;
      this.departments.have.forEach(element => {
        if(element.id == item.id){
          this.departments.have.splice(index,1);
          return;
        }
        index++;
      });
    },err =>{
      this._alertify.error(err.error.message)
    })
  }
  AddDep(item){
    if(item == null){
      this._alertify.message()
      return;
    }
    var model = {
      universityId : this.university.id,
      departmentId : item.id
    }
    this._adminService.CreateUniDep(model).subscribe(data=>{
      this._alertify.success("Ekleme işlemi başarıyla gerçekleşti..");
      this.departments.have.push(item);
      let index = 0;
      this.departments.notHave.forEach(element => {
        if(element.id == item.id){
          this.departments.notHave.splice(index,1);
          return;
        }
        index++;
      });
    },err =>{
      console.log(err);
      this._alertify.error(err.error.message)
    })
  }
}
