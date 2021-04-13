import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-universitylist',
  templateUrl: './universitylist.component.html',
  styleUrls: ['./universitylist.component.css']
})
export class UniversitylistComponent implements OnInit {

  data:any =[];
  dtOptions :DataTables.Settings = {};
  add = false;

  constructor(private _alertify:AlertifyService,private _adminService:AdminService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.data = data.universities;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength:5,
        lengthMenu:[5,15,25],
        processing : true
      }
    })
  }
  deleteUni(uniId,index){
    if(uniId == null || index == null){
      this._alertify.message()
      return;
    }
    this._adminService.DeleteUniversity(uniId).subscribe(
      data=>{
        if(data.id == uniId){
          this.data.splice(index,1);
        }
        this._alertify.success("Silme işlemi başarıyla gerçekleşti..")
      },err =>{
        this._alertify.error(err.error.message)
      }
    )
  }
  ShowAdd(){
    this.add = true;
  }
  addItem(newItem: string) {
    if(newItem == null){
      this._alertify.message()
      return;
    }
    this.data.push(newItem);
    this.add = false;
  }
}
