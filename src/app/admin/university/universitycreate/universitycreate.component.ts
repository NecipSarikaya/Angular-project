import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UniversityService } from 'src/app/_services/university.service';

@Component({
  selector: 'university-create',
  templateUrl: './universitycreate.component.html',
  styleUrls: ['./universitycreate.component.css']
})
export class UniversitycreateComponent implements OnInit {

  @Output() newItemEvent:EventEmitter<any> = new EventEmitter<any>();
  university:any ={};
  succesed = false;
  constructor(private _alertify:AlertifyService,private _adminService:AdminService) { }

  ngOnInit() {
  }
  createUni(){
    if(this.university == null){
      this._alertify.message();
      return;
    }
    this._adminService.CreateUniversity(this.university).subscribe(data=>{
      if(data){
        this.newItemEvent.emit(data);
        this.succesed = true;
        this._alertify.success("Oluşturma işlemi başarıyla gerçekleşti..")
        setTimeout(()=>{
          this.succesed = false;
        },2000)
      }
    },err =>{
      this._alertify.error(err.error.message)
    })
  }
}
